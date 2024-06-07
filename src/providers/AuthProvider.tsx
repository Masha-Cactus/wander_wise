'use client';

import { useRefreshToken } from "@/src/queries";
import { useUser } from "@/src/store/user";
import { PropsWithChildren, useEffect, useState } from "react";
import { LoadedContentStateController } from "@/src/components/molecules";
import { deleteCookie, setCookie } from "cookies-next";

export const AuthProvider = ({children}: PropsWithChildren) => {
  const [isInitialAuthorizing, setIsInitialAuthorizing] = useState(true);
  const { setUser } = useUser();
  const { data, isFetched, isSuccess } = useRefreshToken();

  useEffect(() => {
    if (isFetched) {
      if (isSuccess) {
        setUser(data.user);
        setCookie('token', data.token);
        setCookie('userId', data.user.id);
      } else {
        deleteCookie('token');
        deleteCookie('userId');
      }

      setIsInitialAuthorizing(false);
    }
  }, [isFetched]);
    
  return (
    <LoadedContentStateController 
      isLoading={isInitialAuthorizing}
    >
      {children}
    </LoadedContentStateController>
  );
};