import { useMutation, useQueryClient } from "@tanstack/react-query";
import { socialService } from "../services/socialService/social.service";
import { 
  ICreateSocial, 
  IUpdateSocial 
} from "../services/socialService/social.types";
import { useUser } from "../store/user";

export function useAddSocial() {
  const user = useUser((state) => state.user);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ICreateSocial) => socialService.addSocial(data),
    onSuccess: async() => {
      await queryClient.invalidateQueries({
        queryKey: ['user-socials', {userId: user?.id}],
      });
    }
  });
}

export function useUpdateSocial() {
  const user = useUser((state) => state.user);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IUpdateSocial) => socialService.updateSocial(data),
    onSuccess: async() => {
      await queryClient.invalidateQueries({
        queryKey: ['user-socials', {userId: user?.id}],
      });
    }
  });
}

export function useDeleteSocial() {
  const user = useUser((state) => state.user);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => socialService.deleteSocial(id),
    onSuccess: async() => {
      await queryClient.invalidateQueries({
        queryKey: ['user-socials', {userId: user?.id}],
      });
    }
  });
}