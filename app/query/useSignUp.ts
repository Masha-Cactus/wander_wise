import { useMutation } from "@tanstack/react-query";
import {
  IAuthenticationResponse,
  ISignUp,
  authenticationService,
} from "@/app/services";
import { AxiosError } from "axios";

export const useSignUp = ({}) => {
  const { isPending, isError, error, isSuccess, mutate } = useMutation<
  IAuthenticationResponse,
  AxiosError,
  ISignUp
  >({
    mutationFn: async (signUpData: ISignUp) => {
      return authenticationService.signUp(signUpData);
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
