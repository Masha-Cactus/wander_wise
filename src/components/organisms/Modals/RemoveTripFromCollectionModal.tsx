'use client';

import { memo } from "react";
import { ModalSkeleton } from "@/src/components/organisms";
import { ErrorText, Heading, Heading4 } from "@/src/components/atoms";
import { RoundedButton } from "@/src/components/moleculs";
import { ICard, ICollection, IUpdateCollection } from "@/src/services";
import { useUpdateCollection } from "@/src/queries";
import { useGetCollectionCardIds, useNormalizedError } from "@/src/hooks";

interface RemoveTripFromCollectionModalProps {
  trip: ICard;
  collection: ICollection;
  onClose: () => void;
}

// todo 
// check component in browser

const RemoveTripFromCollectionModal: React.FC<
RemoveTripFromCollectionModalProps
> = ({ trip, collection, onClose }) => {
  const { isPending, mutate, isError } = useUpdateCollection();
  const [errorMessage, setErrorMessage] = useNormalizedError();

  const collectionCardIds = useGetCollectionCardIds(collection.id);

  const handleError = (error: any) => {
    setErrorMessage(error);
  };

  const handleRemoveTrip = () => {
    if (collectionCardIds) {
      const data: IUpdateCollection = {
        ...collection,
        cardIds: collectionCardIds.filter(cardId => cardId !== trip.id),
      };
      
      mutate(data, { 
        onError: handleError,
        onSuccess: () => onClose(),
      });
    }
  };

  return (
    <ModalSkeleton onClose={onClose}>
      <Heading text={`Remove ${trip.name} from ${collection.name}?`} font="normal"/>
      <Heading4 text="This action cannot be undone 🫣" font="medium"/>

      <div className="flex w-full justify-between">
        <RoundedButton
          text="Delete"
          onClick={handleRemoveTrip}
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

export default memo(RemoveTripFromCollectionModal);
