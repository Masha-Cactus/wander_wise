import { 
  keepPreviousData, 
  useMutation, 
  useQuery, 
  useQueryClient 
} from "@tanstack/react-query";
import {
  ICreateCard,
  IUpdateCard,
  IAddCardImages,
  ISearchCard,
  IReportCard,
  cardService,
} from "@/src/services";
import { useUser } from "@/src/store/user";

export function useGetCardDetails(cardId: number) {
  return useQuery({
    queryKey: ["card-details", { cardId }],
    queryFn: () => cardService.getCardDetails(cardId),
    enabled: typeof cardId === 'number',
  });
}

export function useCreateCard() {
  const user = useUser((state) => state.user);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ICreateCard) => cardService.createCard(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["user-collections", { userId: user?.id }],
      });
    },
  });
}

export function useUpdateCard() {
  const user = useUser((state) => state.user);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IUpdateCard) => cardService.updateCard(data),
    onSuccess: async ({ id }) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["user-collections", { userId: user?.id }],
        }),
        queryClient.invalidateQueries({
          queryKey: ["card-details", { cardId: id }],
        }),
      ]);
    },
  });
}

export function useAddCardImages() {
  const user = useUser((state) => state.user);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IAddCardImages) => cardService.addImages(data),
    onSuccess: async ({id}) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["user-collections", { userId: user?.id }],
        }),
        queryClient.invalidateQueries({
          queryKey: ["card-details", { cardId: id }],
        }),
      ]);
    },
  });
}

export function useDeleteCard() {
  const user = useUser((state) => state.user);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cardId: number) => cardService.deleteCard(cardId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["user-collections", { userId: user?.id }],
      });
    },
  });
}

export function useLikeCard() {
  const user = useUser((state) => state.user);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cardId: number) => cardService.likeCard(cardId),
    onSuccess: async (_, cardId) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["user-collections", { userId: user?.id }],
        }),
        queryClient.invalidateQueries({
          queryKey: ["card-details", { cardId }],
        }),
      ]);
    },
  });
}

export function useRemoveLikeFromCard() {
  const user = useUser((state) => state.user);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cardId: number) => cardService.unlikeCard(cardId),
    onSuccess: async (_, cardId) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["user-collections", { userId: user?.id }],
        }),
        queryClient.invalidateQueries({
          queryKey: ["card-details", { cardId }],
        }),
      ]);
    },
  });
}

export function useSaveCard() {
  const user = useUser((state) => state.user);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cardId: number) => cardService.addToSaved(cardId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["user-collections", { userId: user?.id }],
      });
    },
  });
}

export function useRemoveCardFromSaved() {
  const user = useUser((state) => state.user);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cardId: number) => cardService.removeFromSaved(cardId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["user-collections", { userId: user?.id }],
      });
    },
  });
}

export function useReportCard() {
  return useMutation({
    mutationFn: (data: IReportCard) => cardService.reportCard(data),
  });
}

export function useSearchCards(page: number, filterParams: ISearchCard | null) {
  return useQuery({
    queryKey: ['cards', page, filterParams],
    queryFn: () => {
      if (filterParams) {
        return cardService.searchCards(page, filterParams);
      }

      return null;
    },
    placeholderData: keepPreviousData,
    enabled: !!filterParams,
  });
}
