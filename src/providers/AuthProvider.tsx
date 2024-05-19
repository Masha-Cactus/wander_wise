'use client';

import { getUserIdFromCookies } from "@/src/actions/manageCookies";
import { Loader } from "@/src/components/atoms";
import { useGetUserProfile } from "@/src/queries";
import { useUser } from "@/src/store/user";
import { PropsWithChildren, useEffect, useState } from "react";

export const AuthProvider = ({children}: PropsWithChildren) => {
  const [userId, setUserId] = useState<number | null>(null);
  const { isPending, data: user } = useGetUserProfile(userId);
  const { setUser } = useUser();
  
  useEffect(() => {
    getUserIdFromCookies()
      .then(userId => setUserId(userId));
  }, []);
  
  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user]);

  if (isPending) {
    return <Loader />;
  }
    
  return <>{children}</>;
};