import { useMutation } from "@tanstack/react-query";
import { ISignIn, IToken, authenticationService } from "@/app/services";
import { AxiosError } from "axios";

interface UseSignInProps {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export const useSignIn = ({ onError, onSuccess }: UseSignInProps) => {
  const handleError = (error: any) => {
    onError && onError(error);
  };

  const handleSuccess = () => {
    onSuccess && onSuccess();
  };

  const { isPending, isError, error, isSuccess, mutate } = useMutation<
  IToken,
  AxiosError,
  ISignIn
  >({
    mutationFn: async (signInData: ISignIn) => {
      return authenticationService.signIn(signInData);
    },
    onError: handleError,
    onSuccess: handleSuccess,
  });

  return {
    isPending,
    mutate,
    isError,
    error,
    isSuccess,
  };
};
