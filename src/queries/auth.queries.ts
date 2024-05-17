import { useMutation } from "@tanstack/react-query";
import { authService, IEmail, ISignIn, ISignUp } from "@/src/services";
import { useUser } from "@/src/store/user";

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
  const setUser = useUser((state) => state.setUser);

  return useMutation({
    mutationFn: (data: ISignIn) => authService.signIn(data),
    onSuccess: async({ userDto, token }) => {
      setUser(userDto);
      localStorage.setItem('accessToken', token);
    },
  });
}

export function useRestorePassword() {
  return useMutation({
    mutationFn: (data: IEmail) => authService.restorePassword(data),
  });
}

export function useLogout() {
  const token = localStorage.getItem('accessToken');

  return useMutation({
    mutationFn: () => {
      if (token) {
        return authService.logout(token);
      }

      return Promise.reject('User not authorized');
    },
  });
}