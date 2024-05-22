'use client';

import { 
  QueryCache, 
  QueryClient, 
  QueryClientProvider 
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { PropsWithChildren, useState } from "react";
import { useUser } from "@/src/store/user";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";

export function QueryProvider({children}: PropsWithChildren) {
  const setUser = useUser((state) => state.setUser);
  const { push } = useRouter();

  const [client] = useState(new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => {
        if (error instanceof AxiosError 
          && error.response?.status === 401) {
          deleteCookie('userId');
          deleteCookie('token');
          setUser(null);
          push('/');
        }
      }
    })
  }));

  return (
    <QueryClientProvider client={client}>
      {children}
    </QueryClientProvider>
  );
}