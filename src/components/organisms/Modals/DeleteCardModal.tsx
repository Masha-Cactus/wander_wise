"use client";

import { memo, useState } from "react";
import { ModalSkeleton } from "@/src/components/organisms";
import { ErrorText, Heading, Heading4 } from "@/src/components/atoms";
import { RoundedButton } from "@/src/components/moleculs";
import { useDeleteCard } from "@/src/queries";
import { normalizeError } from "@/src/lib/helpers";
import { useNormalizedError } from "@/src/hooks";

interface DeleteCardModalProps {
  onClose: () => void;
  cardId: number;
}

const DeleteCardModal: React.FC<DeleteCardModalProps> = ({
  onClose,
  cardId,
}) => {
  const { isPending, mutate, isError } = useDeleteCard();

  const [errorMessage, setErrorMessage] = useNormalizedError();

  const handleError = (error: any) => {
    setErrorMessage(error);
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

      <div className="w-full grid grid-cols-2 gap-5">
        <RoundedButton
          text="Delete"
          onClick={handleDeleteCard}
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

export default memo(DeleteCardModal);