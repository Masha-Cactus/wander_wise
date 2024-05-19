'use client';

import { PropsWithChildren, memo, useEffect } from "react";
import { useUser } from "@/src/store/user";
import { LoadedContentStateController } from "@/src/components/moleculs";
import { useGetUserProfile } from "@/src/queries/user.queries";

const AuthorizedLayout = ({ children }: PropsWithChildren) => {
  const {
    setUser,
    setIsLoading: setIsLoadingCurrentUser,
    isLoading: isLoadingCurrentUser,
  } = useUser();

  const {
    data: currentUser,
    isLoading: isLoadingCurrentUserData,
    isSuccess: isSuccessCurrentUserData,
    isError: isErrorWithCurrentUserData,
  } = useGetUserProfile();

  useEffect(() => {
    if (isLoadingCurrentUserData !== isLoadingCurrentUser) {
      setIsLoadingCurrentUser(isLoadingCurrentUserData);
    }

    if (isSuccessCurrentUserData && currentUser) {
      setUser(currentUser);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isLoadingCurrentUserData,
    isSuccessCurrentUserData,
    currentUser,
    isLoadingCurrentUser,
  ]);

  return (
    <LoadedContentStateController
      isError={isErrorWithCurrentUserData}
      errorText="unexpected error"
    //   fallbackHeight={300}
    >
      {children}
    </LoadedContentStateController>
  );
};

export default memo(AuthorizedLayout);
