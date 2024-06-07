"use client";

import { memo } from "react";
import { ModalSkeleton } from "@/src/components/organisms";
import { ErrorText } from "@/src/components/atoms";
import { RoundedButton } from "@/src/components/molecules";
import { useDeleteComment } from "@/src/queries";
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
    <ModalSkeleton 
      onClose={onClose}
      title="Delete your review?"
      subtitle="This action cannot be undone 🫣"
    >
      {/* <Heading text="Delete your review?" font="normal"/>
      <Heading4 
        text="This action cannot be undone 🫣" 
        font="normal" 
        classes="mb-2 text-gray-80"
      /> */}

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
