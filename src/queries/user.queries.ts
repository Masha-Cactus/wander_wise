import { useMutation, useQuery } from "@tanstack/react-query";
import { 
  IUpdateInfo, 
  IUpdatePassword, 
  userService 
} from "@/src/services";
import { useUser } from "@/src/store/user";
import { getCookie, deleteCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { Routes } from "../lib/constants";

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
    select: (collections) => collections.filter(collection => 
      !['Saved cards', 'Liked cards', 'Created cards']
        .includes(collection.name)),
  });
}

export function useGetUserSavedCards() {
  const user = useUser((state) => state.user);

  return useQuery({
    queryKey: ['user-collections', {userId: user?.id, type: 'Saved'}],
    queryFn: () => {
      if (user) {
        return userService.getCollections(user.id);
      }

      return Promise.reject('No user authorized');
    },
    enabled: !!user,
    select: (collections) => collections.find(
      (collection) => collection.name === "Saved cards")?.cardDtos,
  });
}

export function useGetUserCreatedCards() {
  const user = useUser((state) => state.user);

  return useQuery({
    queryKey: ['user-collections', {userId: user?.id, type: 'Created'}],
    queryFn: () => {
      if (user) {
        return userService.getCollections(user.id);
      }

      return Promise.reject('No user authorized');
    },
    enabled: !!user,
    select: (collections) => collections.find(
      (collection) => collection.name === "Created cards")?.cardDtos,
  });
}

export function useGetUserLikedCards() {
  const user = useUser((state) => state.user);

  return useQuery({
    queryKey: ['user-collections', {userId: user?.id, type: 'Liked'}],
    queryFn: () => {
      if (user) {
        return userService.getCollections(user.id);
      }

      return Promise.reject('No user authorized');
    },
    enabled: !!user,
    select: (collections) => collections.find(
      (collection) => collection.name === "Liked cards")?.cardDtos,
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
    mutationFn: (image: File | null) => {
      const data = image || new Uint8Array(0);

      if (user) {
        return userService.updateImage({ image: data, id: user.id});
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
      push (Routes.HOME);
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
      setCookie('confirmationCode', user.emailConfirmCode);
    }
  });
}

export function useUpdateEmail() {
  const [user, unbanUser] = useUser((state) => 
    [state.user, state.unbanUser]);
  const confirmationCode = getCookie('confirmationCode');
    
  return useMutation({
    mutationFn: (codeFromUser: string) => {
      if (user) {
        if (codeFromUser !== confirmationCode) {
          return Promise.reject('Wrong confirmation code');
        }

        return userService.updateEmail({userId: user.id, newEmail: user.email});
      }
        
      return Promise.reject('No user authorized');
    },
    onSuccess: ({ token }) => {
      unbanUser();
      setCookie('token', token);
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
    onSuccess: ({ token }) => {
      setCookie('token', token);
    }
  });
}