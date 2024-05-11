import { useMutation, useQuery } from "@tanstack/react-query";
import { IUpdateInfo, userService } from "@/src/services";
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