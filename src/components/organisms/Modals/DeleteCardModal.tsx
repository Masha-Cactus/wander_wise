"use client";

import { memo, useState } from "react";
import ModalSkeleton from "./ModalSkeleton";
import { ErrorText, Heading, Heading4 } from "@/src/components/atoms";
import { RoundedButton } from "@/src/components/moleculs";
import { useDeleteCard } from "@/src/queries";
import { normalizeError } from "@/src/lib/helpers";

interface DeleteReviewModalProps {
  onClose: () => void;
  cardId: number;
}

const DeleteCardModal: React.FC<DeleteReviewModalProps> = ({
  onClose,
  cardId,
}) => {
  const { isPending, mutate, isError } = useDeleteCard();

  const [errorMessage, setErrorMessage] = useState("");

  const handleError = (error: any) => {
    setErrorMessage(normalizeError(error.message));
  };

  const handleDeleteCard = () => {
    mutate(cardId, { 
      onError: handleError,
      onSuccess: () => onClose(),
    });
  };

  return (
    <ModalSkeleton onClose={onClose}>
      <Heading text="Delete your card?" font="normal"/>
      <Heading4 text="This action cannot be undone 🫣" font="normal"/>

      <div className="flex w-full gap-5 justify-between">
        <RoundedButton
          text="Delete"
          onClick={handleDeleteCard}
          classes="grow"
          style='red'
          disabled={isPending}
        />
        <RoundedButton
          text="Cancel"
          onClick={onClose}
          classes="grow"
          style="light"
        />
      </div>

      {isError && <ErrorText errorText={errorMessage} />}
    </ModalSkeleton>
  );
};

export default memo(DeleteCardModal);