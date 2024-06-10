"use client";

import { memo } from "react";
import { ModalSkeleton } from "@/src/components/organisms";
import { ErrorText } from "@/src/components/atoms";
import { RoundedButton } from "@/src/components/molecules";
import { useDeleteCard } from "@/src/queries";
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

  const handleDeleteCard = () => {
    mutate(cardId, { 
      onError: (e) => setErrorMessage(e),
      onSuccess: () => onClose(),
    });
  };

  return (
    <ModalSkeleton 
      onClose={onClose}
      title="Delete your card?"
      subtitle="This action cannot be undone 🫣"
    >
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