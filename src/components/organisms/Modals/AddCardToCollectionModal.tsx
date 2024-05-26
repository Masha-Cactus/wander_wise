"use client";

import { memo, useEffect, useState } from "react";
import { 
  ModalSkeleton, 
  AddCardToCollectionForm,
  CreateCollectionShortForm,
} from "@/src/components/organisms";
import { ErrorText, Heading, Heading4, Divider } from "@/src/components/atoms";
import { ICard } from "@/src/services";
import { useGetUserCollections } from "@/src/queries";
import { useNormalizedError } from "@/src/hooks";

interface AddCardToCollectionProps {
  onClose: () => void;
  card: ICard;
}

const AddCardToCollectionModal: React.FC<AddCardToCollectionProps> = ({
  onClose,
  card,
}) => {
  const [errorMessage, setErrorMessage] = useNormalizedError();
  const [isCreateCollection, setIsCreateCollection] = useState(false);

  const {
    isError,
    data: collections,
    error,
  } = useGetUserCollections();


  useEffect(() => {
    if (error) {
      setErrorMessage(error);
    }
  }, [error]);

  return (
    <ModalSkeleton onClose={onClose}>
      <div className="flex flex-col gap-6">
        <Heading text={`Add “${card.name}” to a collection?`} font="normal"/>
        <Divider classes="h-px w-full" />

        {isCreateCollection ? (
          <CreateCollectionShortForm
            closeModal={onClose}
          />
        ) : (
          <button onClick={() => setIsCreateCollection(true)}>
            <Heading4 text="+ Create new collection" font="medium" />
          </button>
        )}

        {!!(collections && collections.length) && (
          <AddCardToCollectionForm
            closeModal={onClose}
            cardId={card.id}
            collections={collections}
          />
        )}

        {isError && <ErrorText errorText={errorMessage} />}
      </div>
    </ModalSkeleton>
  );
};

export default memo(AddCardToCollectionModal);
