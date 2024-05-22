"use client";

import { memo, useState } from "react";
import ModalSkeleton from "./ModalSkeleton";
import { ErrorText, Heading, Heading4 } from "@/src/components/atoms";
import { RoundedButton } from "@/src/components/moleculs";
import { useDeleteComment } from "@/src/queries";
import { normalizeError } from "@/src/lib/helpers";
import { useParams } from "next/navigation";

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

  const [errorMessage, setErrorMessage] = useState("");

  const handleError = (error: any) => {
    setErrorMessage(normalizeError(error.message));
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
      <Heading4 text="This action cannot be undone 🫣" font="medium"/>

      <div className="flex w-full justify-between">
        <RoundedButton
          text="Delete"
          onClick={handleDeleteReview}
          classes="bg-red text-white"
          disabled={isPending}
        />
        <RoundedButton
          text="Cancel"
          onClick={onClose}
          classes="bg-white text-black border border-black"
        />
      </div>

      {isError && <ErrorText errorText={errorMessage} />}
    </ModalSkeleton>
  );
};

export default memo(DeleteReviewModal);
