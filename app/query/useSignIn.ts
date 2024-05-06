import { useMutation } from "@tanstack/react-query";
import {
  ISignIn,
  IToken,
  authenticationService,
} from "@/app/services";
import { AxiosError } from "axios";

export const useSignIn = ({}) => {
  const { isPending, isError, error, isSuccess, mutate } = useMutation<
  IToken,
  AxiosError,
  ISignIn
  >({
    mutationFn: async (signInData: ISignIn) => {
      return authenticationService.signIn(signInData);
    },
  });

  return {
    isPending,
    mutate,
    isError,
    error,
    isSuccess,
  };
};
