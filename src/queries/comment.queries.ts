import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ICreateComment,
  IReportComment,
  IUpdateComment,
  commentService,
} from "@/src/services";

export function useCreateComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ICreateComment) => commentService.createComment(data),
    onSuccess: async(_, { cardId }) => {
      await queryClient.invalidateQueries({
        queryKey: ['card-details', {cardId} ],
      });
    },
  });
}

export function useUpdateComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IUpdateComment) => commentService.updateComment(data),
    onSuccess: async(_, { cardId }) => {
      await queryClient.invalidateQueries({
        queryKey: ['card-details', {cardId} ],
      });
    },
  });
}

export function useReportComment() {
  return useMutation({
    mutationFn: (data: IReportComment) => commentService.reportComment(data),
  });
}

export function useDeleteComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({commentId}: {commentId: number, cardId: number}) => 
      commentService.deleteComment(commentId),
    onSuccess: async(_, { cardId }) => {
      await queryClient.invalidateQueries({
        queryKey: ['card-details', {cardId} ],
      });
    },
  });
}
