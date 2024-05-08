import { useMutation, useQuery } from "@tanstack/react-query";
import { userService } from "../services/userService/user.service";
import { IUpdateInfo } from "../services/userService/user.types";
import { useUser } from "../store/user";

export function useUserProfile() {
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

export function useUserSocials() {
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

export function useUserCollections() {
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