import { useMutation, useQuery } from "@tanstack/react-query";
import { IUpdateInfo, IUpdateImage, userService } from "@/src/services";
import { useUser } from "@/src/store/user";

export function useGetUserProfile() {
  const user = useUser((state) => state.user);

  return useQuery({
    queryKey: ['user-profile', {userId: user?.id}],
    queryFn: () => {
      if (user) {
        return userService.getProfile(user.id);
      }

      return null;
    },
    enabled: !!user,
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

      return null;
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

      return null;
    },
    enabled: !!user,
  });
}

export function useUpdateUserInfo() {
  const setUser = useUser((state) => state.setUser);

  return useMutation({
    mutationFn: (data: IUpdateInfo) => userService.updateUserInfo(data),
    onSuccess: (user) => {
      setUser(user);
    }
  });
}

export function useUpdateUserImage() {
  const setUser = useUser((state) => state.setUser);

  return useMutation({
    mutationFn: (data: IUpdateImage) => userService.updateImage(data),
    onSuccess: (user) => {
      setUser(user);
    }
  });
}

export function useDeleteUser() {
  const user = useUser((state) => state.user);
  const setUser = useUser((state) => state.setUser);

  return useMutation({
    mutationFn: () => {
      if (user) {
        return userService.deleteUser(user.id);
      }

      return Promise.reject('No user to delete');
    },
    onSuccess: () => {
      setUser(null);
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
    onSuccess: ({ token }) => {
      localStorage.setItem('accessToken', token);
      unbanUser();
    }
  });
}