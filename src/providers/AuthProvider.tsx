'use client';

import { 
  clearCookies, 
  saveCookies
} from "@/src/actions/manageCookies";
import { useRefreshToken } from "@/src/queries";
import { useUser } from "@/src/store/user";
import { PropsWithChildren, useEffect, useState } from "react";
import { LoadedContentStateController } from "@/src/components/moleculs";

export const AuthProvider = ({children}: PropsWithChildren) => {
  const [isInitialAuthorizing, setIsInitialAuthorizing] = useState(true);
  const { setUser } = useUser();
  const { data, isFetched, isSuccess } = useRefreshToken();

  useEffect(() => {
    if (isFetched) {
      if (isSuccess) {
        saveCookies({token: data.token, userId: data.user.id})
          .then (() => {
            setUser(data.user);
          });
      } else {
        clearCookies();
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