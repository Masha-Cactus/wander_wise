"use client";

import { memo } from "react";
import { useRouter } from "next/navigation";
import { ModalTemplate } from "@/src/components/organisms";
import { ErrorText } from "@/src/components/atoms";
import { RoundedButton } from "@/src/components/molecules";
import { useDeleteCollection } from "@/src/queries";
import { Routes } from "@/src/lib/constants";
import { useNormalizedError } from "@/src/hooks";

interface DeleteCollectionModalProps {
  onClose: () => void;
  collectionId: number;
}

const DeleteCollectionModal: React.FC<DeleteCollectionModalProps> = ({
  onClose,
  collectionId,
}) => {
  const { push } = useRouter();
  const { isPending, mutate } = useDeleteCollection();

  const [errorMessage, setErrorMessage] = useNormalizedError();

  const handleDeleteCollection = () => {
    mutate(collectionId, { 
      onError: (e) => setErrorMessage(e),
      onSuccess: () => push(Routes.COLLECTIONS.MAIN),
    });
  };

  return (
    <ModalTemplate 
      onClose={onClose}
      title="Delete your collection?"
      subtitle="This action cannot be undone 🫣"
    >
      <div className="grid w-full grid-cols-2 gap-5">
        <RoundedButton
          text="Delete"
          onClick={handleDeleteCollection}
          style='red'
          disabled={isPending}
        />
        <RoundedButton
          text="Cancel"
          onClick={onClose}
          style="light"
        />
      </div>

      {errorMessage && <ErrorText errorText={errorMessage} />}
    </ModalTemplate>
  );
};

export default memo(DeleteCollectionModal);