"use client";

import { memo, useState } from "react";
import { ModalSkeleton } from "@/src/components/organisms";
import { ErrorText, Heading, Heading4 } from "@/src/components/atoms";
import { RoundedButton } from "@/src/components/moleculs";
import { useDeleteCard, useDeleteCollection } from "@/src/queries";
import { normalizeError } from "@/src/lib/helpers";
import { useRouter } from "next/navigation";
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
  const { isPending, mutate, isError } = useDeleteCollection();

  const [errorMessage, setErrorMessage] = useNormalizedError();

  const handleError = (error: any) => {
    setErrorMessage(error);
  };

  const handleDeleteCollection = () => {
    mutate(collectionId, { 
      onError: handleError,
      onSuccess: () => push(Routes.COLLECTIONS.MAIN),
    });
  };

  return (
    <ModalSkeleton onClose={onClose}>
      <Heading text="Delete your collection?" font="normal"/>
      <Heading4 text="This action cannot be undone 🫣" font="normal"/>

      <div className="w-full grid grid-cols-2 gap-5">
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

      {isError && <ErrorText errorText={errorMessage} />}
    </ModalSkeleton>
  );
};

export default memo(DeleteCollectionModal);