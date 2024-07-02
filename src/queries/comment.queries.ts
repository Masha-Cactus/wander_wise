import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ICreateComment,
  IReportComment,
  IUpdateComment,
  commentService,
} from "@/src/services";
import { useUser } from "@/src/store/user";

export function useCreateComment() {
  const user = useUser((state) => state.user);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ICreateComment) => {
      if (user?.banned) {
        return Promise.reject(new Error(
          'Email confirmation is required for this action.'
        ));
      }
      
      return commentService.createComment(data);
    },
    onSuccess: async(_, { cardId }) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['card-details', {cardId} ],
        }),
        queryClient.invalidateQueries({
          queryKey: ['user-comments', {userId: user?.id}],
        }),
      ]);
    },
  });
}

export function useUpdateComment() {
  const user = useUser((state) => state.user);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IUpdateComment) => commentService.updateComment(data),
    onSuccess: async(_, { cardId }) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['card-details', {cardId} ],
        }),
        queryClient.invalidateQueries({
          queryKey: ['user-comments', {userId: user?.id}],
        }),
      ]);
    },
  });
}

export function useReportComment() {
  return useMutation({
    mutationFn: (data: IReportComment) => commentService.reportComment(data),
  });
}

export function useDeleteComment() {
  const user = useUser((state) => state.user);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({commentId}: {commentId: number, cardId: number}) => 
      commentService.deleteComment(commentId),
    onSuccess: async(_, { cardId }) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['card-details', {cardId} ],
        }),
        queryClient.invalidateQueries({
          queryKey: ['user-comments', {userId: user?.id}],
        }),
      ]);
    },
  });
}
