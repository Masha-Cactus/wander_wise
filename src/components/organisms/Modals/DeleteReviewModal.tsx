"use client";

import { memo, useState } from "react";
import { ModalSkeleton } from "@/src/components/organisms";
import { ErrorText, Heading, Heading4 } from "@/src/components/atoms";
import { RoundedButton } from "@/src/components/moleculs";
import { useDeleteComment } from "@/src/queries";
import { normalizeError } from "@/src/lib/helpers";
import { useParams } from "next/navigation";
import { useNormalizedError } from "@/src/hooks";

interface DeleteReviewModalProps {
  onClose: () => void;
  commentId: number;
}

const DeleteReviewModal: React.FC<DeleteReviewModalProps> = ({
  onClose,
  commentId,
}) => {
  const { id: cardId } = useParams();
  const { isPending, mutate, isError } = useDeleteComment();

  const [errorMessage, setErrorMessage] = useNormalizedError();

  const handleError = (error: any) => {
    setErrorMessage(error);
  };

  const handleDeleteReview = () => {
    if (cardId) {
      mutate({commentId, cardId: +cardId}, { 
        onError: handleError,
        onSuccess: () => onClose(),
      });
    }
  };

  return (
    <ModalSkeleton onClose={onClose}>
      <Heading text="Delete your review?" font="normal"/>
      <Heading4 text="This action cannot be undone 🫣" font="normal"/>

      <div className="w-full grid grid-cols-2 gap-5">
        <RoundedButton
          text="Delete"
          onClick={handleDeleteReview}
          style='red'
          disabled={isPending}
        />
        <RoundedButton
          text="Cancel"
          onClick={onClose}
          style="light"
        />
      </div>

      {isError && <ErrorText errorText={errorMessage} />}
    </ModalSkeleton>
  );
};

export default memo(DeleteReviewModal);
