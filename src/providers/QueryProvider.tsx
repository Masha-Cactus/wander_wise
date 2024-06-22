'use client';

import { PropsWithChildren, useState } from "react";
import { 
  QueryCache, 
  QueryClient, 
  QueryClientProvider 
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";
import { useUser } from "@/src/store/user";
import { Routes } from "@/src/lib/constants";

export function QueryProvider({children}: PropsWithChildren) {
  const setUser = useUser((state) => state.setUser);
  const { push } = useRouter();

  const [client] = useState(new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        staleTime: 5 * 60 * 1000,
      },
    },
    queryCache: new QueryCache({
      onError: (error) => {
        if (error instanceof AxiosError && error.response?.status === 401) {
          deleteCookie('token');
          setUser(null);
          push(Routes.HOME);
        }
      }
    }),
  }));

  return (
    <QueryClientProvider client={client}>
      {children}
    </QueryClientProvider>
  );
}