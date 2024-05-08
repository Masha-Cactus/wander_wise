import { PropsWithChildren, useEffect } from "react";
// import { useGetCurrentUser } from "@/app/query";
import { useUser } from "@/src/store/user";
import { LoadedContentStateController } from "@/src/components/moleculs";
import { useUserProfile } from "@/src/queries/user.queries";

const AuthorizedLayout = ({ children }: PropsWithChildren) => {
  const {
    setUser,
    setIsLoading: setIsLoadingCurrentUser,
    isLoading: isLoadingCurrentUser,
  } = useUser();

  //   const {
  //     currentUser,
  //     isLoading: isLoadingCurrentUserData,
  //     isSuccess: isSuccessCurrentUserData,
  //     isError: isErrorWithCurrentUserData,
  //   } = useGetCurrentUser();

  const {
    data: currentUser,
    isLoading: isLoadingCurrentUserData,
    isSuccess: isSuccessCurrentUserData,
    isError: isErrorWithCurrentUserData,
  } = useUserProfile();

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
