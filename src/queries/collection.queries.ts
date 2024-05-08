import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { 
  collectionService 
} from "../services/collectionService/collection.service";
import { 
  ICreateCollection, 
  IUpdateCollection 
} from "../services/collectionService/collection.types";
import { useUser } from "../store/user";

export function useCollection(collectionId: number) {
  return useQuery({
    queryKey: ['collection', {collectionId}],
    queryFn: () => collectionService.getCollection(collectionId),
  });
}

export function useCreateCollection() {
  const user = useUser((state) => state.user);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ICreateCollection) => 
      collectionService.createCollection(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['user-collections', {userId: user?.id}],
      });
    }
  });
}

export function useUpdateCollection() {
  const user = useUser((state) => state.user);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IUpdateCollection) => 
      collectionService.updateCollection(data),
    onSuccess: async ({ id }) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['user-collections', {userId: user?.id}],
        }),
        queryClient.invalidateQueries({
          queryKey: ['collection', {collectionId: id}],
        }), 
      ]);
    }
  });
}

export function useDeleteCollection() {
  const user = useUser((state) => state.user);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (collectionId: number) => 
      collectionService.deleteCollection(collectionId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['user-collections', {userId: user?.id}],
      });
    }
  });
}