import { useMutation, useQuery } from "@tanstack/react-query";
import { 
  IUpdateInfo, 
  IUpdateImage, 
  IUpdatePassword, 
  userService 
} from "@/src/services";
import { useUser } from "@/src/store/user";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

// this query is currently used only for auto-authorization on first load
export function useGetUserProfile(userId: number | null) {
  return useQuery({
    queryKey: ['user-profile', {userId}],
    queryFn: () => {
      if (userId) {
        return userService.getProfile(userId);
      }

      return Promise.reject('No user authorized');
    },
    enabled: typeof userId === 'number',
    staleTime: Infinity,
    gcTime: Infinity,
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

      return Promise.reject('No user authorized');
    },
    enabled: !!user,
  });
}

export function useGetUserCollections() {
  const user = useUser((state) => state.user);

  return useQuery({
    queryKey: ['user-collections', {userId: user?.id}],
    queryFn: () => {
      if (user) {
        return userService.getCollections(user.id);
      }

      return Promise.reject('No user authorized');
    },
    enabled: !!user,
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
    
      return Promise.reject('No user authorized');
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

      return Promise.reject('No user authorized');
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
    mutationFn: (data: Omit<IUpdateImage, 'id'>) => {
      if (user) {
        return userService.updateImage({...data, id: user.id});
      }

      return Promise.reject('No user authorized'); 
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

      return Promise.reject('No user to delete');
    },
    onSuccess: () => {
      setUser(null);
      deleteCookie('userId');
      deleteCookie('token');
      deleteCookie('confirmationCode');
      push ('/');
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
    
      return Promise.reject('No user authorized');
    },
    onSuccess: (user) => {
      setUser(user);
    }
  });
}

export function useUpdateEmail() {
  const [user, unbanUser] = useUser((state) => 
    [state.user, state.unbanUser]);
    
  return useMutation({
    mutationFn: (confirmationCode: string) => {
      if (user) {
        if (user.emailConfirmCode !== confirmationCode) {
          return Promise.reject('Wrong confirmation code');
        }

        return userService.updateEmail({userId: user.id, newEmail: user.email});
      }
        
      return Promise.reject('No user authorized');
    },
    onSuccess: () => {
      unbanUser();
      deleteCookie('confirmationCode');
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

      return Promise.reject('No user authorized');
    },
  });
}