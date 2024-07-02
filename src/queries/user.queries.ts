import { useMutation, useQuery } from "@tanstack/react-query";
import { getCookie, deleteCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { 
  IUpdateInfo, 
  IUpdatePassword, 
  ICollection,
  userService 
} from "@/src/services";
import { useUser } from "@/src/store/user";
import { Routes } from "@/src/lib/constants";

export function useGetUserProfile(userId: number | null) {
  return useQuery({
    queryKey: ['user-profile', {userId}],
    queryFn: () => {
      if (userId) {
        return userService.getProfile(userId);
      }

      return null;
    },
  });
}

export function useGetUserSocials() {
  const user = useUser((state) => state.user);

  return useQuery({
    queryKey: ['user-socials', {userId: user?.id}],
    queryFn: () => {
      if (user) {
        return userService.getSocials(user.id);
      }

      return Promise.reject(new Error('No user authorized'));
    },
    enabled: !!user,
  });
}

export function useGetUserCollections<T>(select: (data: ICollection[]) => T) {
  const user = useUser((state) => state.user);

  return useQuery({
    queryKey: ['user-collections', {userId: user?.id}],
    queryFn: () => {
      if (user) {
        return userService.getCollections(user.id);
      }

      return Promise.reject(new Error('No user authorized'));
    },
    enabled: !!user,
    select,
  });
}

export function useGetUserComments() {
  const user = useUser((state) => state.user);

  return useQuery({
    queryKey: ['user-comments', {userId: user?.id}],
    queryFn: () => {
      if (user) {
        return userService.getComments(user.id);
      }
    
      return Promise.reject(new Error('No user authorized'));
    },
    enabled: !!user,
  });
}

export function useUpdateUserInfo() {
  const user = useUser((state) => state.user);
  const setUser = useUser((state) => state.setUser);

  return useMutation({
    mutationFn: (data: Omit<IUpdateInfo, 'userId'>) => {
      if (user) {
        return userService.updateUserInfo({...data, userId: user.id});
      }

      return Promise.reject(new Error('No user authorized'));
    },
    onSuccess: (user) => {
      setUser(user);
    }
  });
}

export function useUpdateUserImage() {
  const user = useUser((state) => state.user);
  const setUser = useUser((state) => state.setUser);

  return useMutation({
    mutationFn: (image: File | null) => {
      const data = image || new Uint8Array(0);

      if (user) {
        return userService.updateImage({ image: data, id: user.id});
      }

      return Promise.reject(new Error('No user authorized')); 
    },
    onSuccess: (user) => {
      setUser(user);
    }
  });
}

export function useDeleteUser() {
  const user = useUser((state) => state.user);
  const setUser = useUser((state) => state.setUser);
  const { push } = useRouter();

  return useMutation({
    mutationFn: () => {
      if (user) {
        return userService.deleteUser(user.id);
      }

      return Promise.reject(new Error('No user to delete'));
    },
    onSuccess: () => {
      setUser(null);
      deleteCookie('token');
      deleteCookie('confirmationCode');
      deleteCookie('email');
      push(Routes.HOME);
    }
  });
}

export function useRequestUpdateEmail() {
  const user = useUser((state) => state.user);
  const setUser = useUser((state) => state.setUser);

  return useMutation({
    mutationFn: (newEmail: string) => {
      if (user) {
        return userService.requestUpdateEmail({userId: user.id, newEmail});
      }
    
      return Promise.reject(new Error('No user authorized'));
    },
    onSuccess: (user, newEmail) => {
      setUser(user);
      localStorage.setItem('emailConfirmationType', 'update');
      setCookie('email', newEmail);
      setCookie('confirmationCode', user.emailConfirmCode);
    }
  });
}

export function useUpdateEmail() {
  const [user, setUser] = useUser((state) => 
    [state.user, state.setUser]);
  const newEmail = getCookie('email');
  const confirmationCode = getCookie('confirmationCode');
    
  return useMutation({
    mutationFn: (codeFromUser: string) => {
      if (user && newEmail) {
        if (codeFromUser !== confirmationCode) {
          return Promise.reject(new Error('Wrong confirmation code'));
        }

        return userService.updateEmail({userId: user.id, newEmail});
      }
        
      return Promise.reject(new Error('No user authorized'));
    },
    onSuccess: ({ user, token }) => {
      setUser(user);
      setCookie('token', token);
      localStorage.removeItem('emailConfirmationType');
      deleteCookie('confirmationCode');
      deleteCookie('email');
    },
  });
}

export function useUpdatePassword() {
  const user = useUser((state) => state.user);

  return useMutation({
    mutationFn: (data: Omit<IUpdatePassword, 'userId'>) => {
      if (user) {
        return userService.updatePassword({...data, userId: user.id});
      }

      return Promise.reject(new Error('No user authorized'));
    },
    onSuccess: ({ token }) => {
      setCookie('token', token);
    }
  });
}