import { useMutation } from "@tanstack/react-query";
import { authService, IEmail, ISignIn, ISignUp } from "@/src/services";
import { useUser } from "@/src/store/user";
import { getCookie, deleteCookie } from "cookies-next";

export function useSignUp() {
  const setUser = useUser((state) => state.setUser);

  return useMutation({
    mutationFn: (data: ISignUp) => authService.signUp(data),
    onSuccess: (user) => {
      setUser(user);
    },
  });
}

export function useConfirmEmail() {
  const [user, unbanUser] = useUser((state) => 
    [state.user, state.unbanUser]);
  const confirmationCode = getCookie('confirmationCode');

  return useMutation({
    mutationFn: (codeFromUser: string) => {
      if (user && confirmationCode) {
        if (codeFromUser !== confirmationCode) {
          return Promise.reject('Wrong confirmation code');
        }

        return authService.confirmEmail(user.email);
      }
    
      return Promise.reject('User has not completed registration');
    },
    onSuccess: () => {
      unbanUser();
      deleteCookie('confirmationCode');
    }
  });
}

export function useSignIn() {
  const setUser = useUser((state) => state.setUser);

  return useMutation({
    mutationFn: (data: ISignIn) => authService.signIn(data),
    onSuccess: async({ user }) => {
      setUser(user);
    },
  });
}

export function useRestorePassword() {
  return useMutation({
    mutationFn: (data: IEmail) => authService.restorePassword(data),
  });
}

export function useLogout() {
  const token = getCookie('token');
  const setUser = useUser((state) => state.setUser);

  return useMutation({
    mutationFn: () => {
      if (token) {
        return authService.logout(token);
      }

      return Promise.reject('User not authorized');
    },

    onSuccess: () => {
      setUser(null);
    }
  });
}