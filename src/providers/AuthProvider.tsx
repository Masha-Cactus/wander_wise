'use client';

import { PropsWithChildren, useEffect, useState } from "react";
import { useRefreshToken } from "@/src/queries";
import { LoadedContentStateController } from "@/src/components/molecules";

export const AuthProvider = ({children}: PropsWithChildren) => {
  const [isInitialAuthorizing, setIsInitialAuthorizing] = useState(true);
  const { mutate: refresh } = useRefreshToken();

  useEffect(() => {
    refresh(undefined, {
      onSettled: () => setIsInitialAuthorizing(false),
    })
  }, []);
    
  return (
    <LoadedContentStateController 
      isLoading={isInitialAuthorizing}
    >
      {children}
    </LoadedContentStateController>
  );
};