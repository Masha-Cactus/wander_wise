'use client';

import { 
  clearCookies, 
  getUserDataFromCookies 
} from "@/src/actions/manageCookies";
import { Loader } from "@/src/components/atoms";
import { useGetUserProfile } from "@/src/queries";
import { useUser } from "@/src/store/user";
import { PropsWithChildren, useEffect, useState } from "react";

export const AuthProvider = ({children}: PropsWithChildren) => {
  const [isInitialAuthorizing, setIsInitialAuthorizing] = useState(true);
  const [userId, setUserId] = useState<number | null>(null);
  const { data: user, isFetched } = useGetUserProfile(userId);
  const { setUser } = useUser();
  
  useEffect(() => {
    getUserDataFromCookies()
      .then((data) => {
        if (data) {
          setUserId(data.userId);
        } else {
          clearCookies();
          setIsInitialAuthorizing(false);
        }
      });
  }, []);
  
  useEffect(() => {
    if (isFetched) {
      if (user) {
        setUser(user);
      }

      setIsInitialAuthorizing(false);
    }
  }, [user, isFetched]);

  if (isInitialAuthorizing) {
    return <Loader />;
  }
    
  return <>{children}</>;
};