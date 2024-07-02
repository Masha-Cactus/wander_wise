import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ICreateCollection,
  IUpdateCollection,
  collectionService,
} from "@/src/services";
import { useUser } from "@/src/store/user";

export function useGetCollection(collectionId: number) {
  return useQuery({
    queryKey: ['collection', {collectionId}],
    queryFn: () => collectionService.getCollection(collectionId),
    enabled: !!collectionId,
  });
}

export function useCreateCollection() {
  const user = useUser((state) => state.user);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<ICreateCollection, 'userId'>) => {
      if (user) {
        return collectionService.createCollection({...data, userId: user.id});
      }

      return Promise.reject(new Error('No user authorized'));
    },
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