import { useMutation } from "@tanstack/react-query";
import { getCookie, deleteCookie, setCookie } from "cookies-next";
import { authService, IEmail, ISignIn, ISignUp } from "@/src/services";
import { useUser } from "@/src/store/user";

export function useSignUp() {
  return useMutation({
    mutationFn: (data: ISignUp) => authService.signUp(data),
    onSuccess: (user) => {
      setCookie('email', user.email);
      localStorage.setItem('emailConfirmationType', 'initial');
      if (user.emailConfirmCode) {
        setCookie('confirmationCode', user.emailConfirmCode);
      }
    },
  });
}

export function useConfirmEmail() {
  const setUser = useUser((state) => state.setUser);
  const confirmationCode = getCookie('confirmationCode');
  const userEmail = getCookie('email');

  return useMutation({
    mutationFn: (codeFromUser: string) => {
      if (confirmationCode && userEmail) {
        if (codeFromUser !== confirmationCode) {
          return Promise.reject(new Error('Wrong confirmation code'));
        }

        return authService.confirmEmail(userEmail);
      }
    
      return Promise.reject(new Error('User has not completed registration'));
    },
    onSuccess: ({ user, token }) => {
      setUser(user);
      setCookie('token', token);
      localStorage.removeItem('emailConfirmationType');
      deleteCookie('confirmationCode');
      deleteCookie('email');
    }
  });
}

export function useSignIn() {
  const setUser = useUser((state) => state.setUser);

  return useMutation({
    mutationFn: (data: ISignIn) => authService.signIn(data),
    onSuccess: ({ user, token }) => {
      setUser(user);
      setCookie('token', token);
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

      return Promise.reject(new Error('User not authorized'));
    },

    onSuccess: () => {
      setUser(null);
      deleteCookie('token');
    }
  });
}

// this mutation is currently used only for auto-authorization on first load
export function useRefreshToken() {
  const token = getCookie('token');
  const setUser = useUser((state) => state.setUser);

  return useMutation({
    mutationFn: () => {
      if (token) {
        return authService.refresh();
      }

      return Promise.reject(new Error("User not authorized"));
    },
    retry: false,
    onSuccess: ({ user, token }) => {
      setUser(user);
      setCookie('token', token);
    }, 
    onError: () => {
      deleteCookie('token');
    },
  });
}