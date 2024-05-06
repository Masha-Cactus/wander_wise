import { PropsWithChildren, useEffect } from "react";
import { useGetCurrentUser } from "@/app/query";
import { useUser } from "@/app/store/user";
import { LoadedContentStateController } from "@/app/components/moleculs";

const AuthorizedLayout = ({ children }: PropsWithChildren) => {
  const {
    setUser,
    setIsLoading: setIsLoadingCurrentUser,
    isLoading: isLoadingCurrentUser,
  } = useUser();

  const {
    currentUser,
    isLoading: isLoadingCurrentUserData,
    isSuccess: isSuccessCurrentUserData,
    isError: isErrorWithCurrentUserData,
  } = useGetCurrentUser();

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
      fallbackHeight={300}
    >
      {children}
    </LoadedContentStateController>
  );
};

export default AuthorizedLayout;
