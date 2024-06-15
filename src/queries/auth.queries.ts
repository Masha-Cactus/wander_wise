import { useMutation, useQuery } from "@tanstack/react-query";
import { getCookie, deleteCookie, setCookie } from "cookies-next";
import { authService, IEmail, ISignIn, ISignUp } from "@/src/services";
import { useUser } from "@/src/store/user";

export function useSignUp() {
  const setUser = useUser((state) => state.setUser);

  return useMutation({
    mutationFn: (data: ISignUp) => authService.signUp(data),
    onSuccess: (user) => {
      setUser(user);

      if (user.emailConfirmCode) {
        setCookie('confirmationCode', user.emailConfirmCode);
      }

      setCookie('userId', user.id);
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
    onSuccess: (data) => {
      unbanUser();
      setCookie('token', data.token);
      deleteCookie('confirmationCode');
    }
  });
}

export function useSignIn() {
  const setUser = useUser((state) => state.setUser);

  return useMutation({
    mutationFn: (data: ISignIn) => authService.signIn(data),
    onSuccess: async({ user, token }) => {
      setUser(user);
      setCookie('token', token);
      setCookie('userId', user.id);
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
      deleteCookie('userId');
      deleteCookie('token');
    }
  });
}

// this query is currently used only for auto-authorization on first load
export function useRefreshToken() {
  return useQuery({
    queryKey: ['refresh'],
    queryFn: () => authService.refresh(),
    staleTime: Infinity,
    gcTime: Infinity,
    retry: false,
  });
}