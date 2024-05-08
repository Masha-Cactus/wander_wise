import { useMutation } from "@tanstack/react-query";
import { authService } from "../services/authService/auth.service";
import { IEmail, ISignIn, ISignUp } from "../services/authService/auth.types";
import { useUser } from "../store/user";

export function useSignUp() {
  const setUser = useUser((state) => state.setUser);

  return useMutation({
    mutationFn: (data: ISignUp) => authService.signUp(data),
    onSuccess: (user) => {
      setUser(user);
    }
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
export function useSignIn() {
  return useMutation({
    mutationFn: (data: ISignIn) => authService.signIn(data),
    onSuccess: ({ token }) => {
      localStorage.setItem('accessToken', token);
    }
  });
}

export function useRestorePassword() {
  return useMutation({
    mutationFn: (data: IEmail) => authService.restorePassword(data),
  });
}