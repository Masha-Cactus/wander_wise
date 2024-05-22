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
  const [userId, setUserId] = useState<number | null>(null);
  const { isLoading, fetchStatus, data: user } = useGetUserProfile(userId);
  const { setUser } = useUser();
  
  useEffect(() => {
    getUserDataFromCookies()
      .then((data) => {
        if (data) {
          setUserId(data.userId);
        } else {
          clearCookies();
        }
      });
  }, []);
  
  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user]);

  if (isLoading && fetchStatus !== 'idle') {
    return <Loader />;
  }
    
  return <>{children}</>;
};