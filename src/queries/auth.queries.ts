import { useMutation } from "@tanstack/react-query";
import { authService, IEmail, ISignIn, ISignUp } from "@/src/services";
import { useUser } from "@/src/store/user";
import { normalizeError } from "@/src/lib/helpers";

export function useSignUp({
  onError,
}: {
  onError: (error: any) => void;
}) {
  const setUser = useUser((state) => state.setUser);

  const handleError = (error: any) => {
    const errorMessage = normalizeError(error);

    onError(errorMessage);
  };

  return useMutation({
    mutationFn: (data: ISignUp) => authService.signUp(data),
    onSuccess: (user) => {
      setUser(user);
    },
    onError: handleError,
  });
}

export function useConfirmEmail() {
  const [user, unbanUser] = useUser((state) => 
    [state.user, state.unbanUser]);

  return useMutation({
    mutationFn: (confirmationCode: string) => {
      if (user) {
        if (user.emailConfirmCode !== confirmationCode) {
          return Promise.reject('Wrong confirmation code');
        }

        return authService.confirmEmail(user.email);
      }
    
      return Promise.reject('User has not completed registration');
    },
    onSuccess: ({ token }) => {
      localStorage.setItem('accessToken', token);
      unbanUser();
    }
  });
}

// user will come together with token
export function useSignIn({
  onError,
}: {
  onError: (error: any) => void;
}) {
  const handleError = (error: any) => {
    const errorMessage = normalizeError(error);

    onError(errorMessage);
  };

  return useMutation({
    mutationFn: (data: ISignIn) => authService.signIn(data),
    onSuccess: ({ token }) => {
      localStorage.setItem('accessToken', token);
    },
    onError: handleError,
  });
}

export function useRestorePassword() {
  return useMutation({
    mutationFn: (data: IEmail) => authService.restorePassword(data),
  });
}