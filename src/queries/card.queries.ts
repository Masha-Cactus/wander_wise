/* eslint-disable @typescript-eslint/no-unused-vars */
import { 
  useInfiniteQuery,
  useMutation, 
  useQuery, 
  useQueryClient 
} from "@tanstack/react-query";
import {
  ICard,
  ICreateCard,
  IUpdateCard,
  IAddCardImages,
  ISearchCard,
  ISearchCardResponse,
  IReportCard,
  cardService,
} from "@/src/services";
import { useUser } from "@/src/store/user";
import { CARDS_PER_PAGE } from "@/src/lib/constants";

export function useGetCardDetails(cardId: number | null) {
  return useQuery({
    queryKey: ["card-details", { cardId }],
    queryFn: () => {
      if (cardId) {
        return cardService.getCardDetails(cardId);
      }

      return null;
    },
    enabled: typeof cardId === 'number',
    staleTime: 0,
  });
}

export function useCreateCard() {
  const user = useUser((state) => state.user);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ICreateCard) => {
      if (user?.banned) {
        return Promise.reject(new Error(
          'Email confirmation is required for this action.'
        ));
      }
      
      return cardService.createCard(data);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['user-collections', { userId: user?.id }],
      });
    },
  });
}

export function useUpdateCard() {
  const user = useUser((state) => state.user);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IUpdateCard) => {
      if (user?.banned) {
        return Promise.reject(new Error(
          'Email confirmation is required for this action.'
        ));
      }

      return cardService.updateCard(data);
    },
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
    mutationFn: (data: IAddCardImages) => {
      if (user?.banned) {
        return Promise.reject(new Error(
          'Email confirmation is required for this action.'
        ));
      }

      return cardService.addImages(data);
    },
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
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["user-collections", { userId: user?.id }],
        }),
        queryClient.invalidateQueries({
          queryKey: ['user-comments', { userId: user?.id }],
        }),
      ]);
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
          queryKey: ['user-collections', { userId: user?.id }],
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
          queryKey: ['user-collections', { userId: user?.id }],
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
        queryKey: ['user-collections', { userId: user?.id }],
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
        queryKey: ['user-collections', { userId: user?.id }],
      });
    },
  });
}

export function useReportCard() {
  return useMutation({
    mutationFn: (data: IReportCard) => cardService.reportCard(data),
  });
}

export function usePopularCards(page: number) {
  return useInfiniteQuery({
    queryKey: ['popular-cards'],
    queryFn: ({ signal }) => cardService.getPopular(signal),
    initialPageParam: 0,
    getNextPageParam: (data: ICard[], _, __, allPageParams) => {
      if (data.length < CARDS_PER_PAGE 
        && page === allPageParams[allPageParams.length - 1]) {
        return undefined;
      }

      return page + 1;
    },
    getPreviousPageParam: (data: ICard[]) => {
      if (page - 1 < 0) {
        return undefined;
      }
      
      return page - 1;
    },
  });
}

export function useSearchCards(filterParams: ISearchCard | null, page: number) {
  return useInfiniteQuery({
    queryKey: ['cards', filterParams],
    queryFn: ({ pageParam, signal }) => {
      if (filterParams) {
        return cardService.searchCards(pageParam, filterParams, signal);
      }

      return Promise.reject(new Error("Filter parameters are required"));
    },
    enabled: !!filterParams,
    initialPageParam: 0,
    getNextPageParam: (data: ISearchCardResponse, _, __, allPageParams) => {
      if (data.cards.length < CARDS_PER_PAGE
        && page === allPageParams[allPageParams.length - 1]) {
        return undefined;
      }

      return page + 1;
    },
    getPreviousPageParam: (data: ISearchCardResponse) => {
      if (page - 1 < 0) {
        return undefined;
      }

      return page - 1;
    },
  });
}
