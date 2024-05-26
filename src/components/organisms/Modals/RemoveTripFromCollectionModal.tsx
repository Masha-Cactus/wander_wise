'use client';

import { memo } from "react";
import { ModalSkeleton } from "@/src/components/organisms";
import { ErrorText, Heading, Heading4 } from "@/src/components/atoms";
import { RoundedButton } from "@/src/components/moleculs";
import { ICard, IUpdateCollection } from "@/src/services";
import { 
  useGetCollection, 
  useRemoveCardFromSaved, 
  useUpdateCollection 
} from "@/src/queries";
import { useNormalizedError } from "@/src/hooks";

interface RemoveTripFromCollectionModalProps {
  trip: ICard;
  collectionId: number;
  onClose: () => void;
}

// todo 
// check component in browser

const RemoveTripFromCollectionModal: React.FC<
RemoveTripFromCollectionModalProps
> = ({ trip, collectionId, onClose }) => {
  const { isPending, mutate, isError } = useUpdateCollection();
  const {
    isPending: isRemovePending, 
    mutate: remove, 
    isError: isRemoveError 
  } = useRemoveCardFromSaved();
  const [errorMessage, setErrorMessage] = useNormalizedError();
  const { data: collection } = useGetCollection(collectionId);


  const handleError = (error: any) => {
    setErrorMessage(error);
  };

  const handleRemoveTrip = () => {
    if (collection?.name === 'Saved cards') {
      remove(trip.id, {
        onError: handleError,
        onSuccess: () => onClose(),
      });

      return;
    }

    if (collection) {
      const data: IUpdateCollection = {
        ...collection,
        cardIds: collection.cardDtos
          .filter(card => card.id !== trip.id)
          .map(card => card.id),
      };
      
      mutate(data, { 
        onError: handleError,
        onSuccess: () => onClose(),
      });
    }
  };

  return (
    <ModalSkeleton onClose={onClose}>
      <Heading text={`Remove ${trip.name} from ${collection?.name}?`} font="normal"/>
      <Heading4 text="This action cannot be undone 🫣" font="medium"/>

      <div className="flex w-full gap-5 justify-between">
        <RoundedButton
          text="Delete"
          onClick={handleRemoveTrip}
          classes="grow"
          style="red"
          disabled={isPending || isRemovePending}
        />
        <RoundedButton
          text="Cancel"
          onClick={onClose}
          classes="grow"
          style="light"
        />
      </div>

      {(isError || isRemoveError) && <ErrorText errorText={errorMessage} />}
    </ModalSkeleton>
  );
};

export default memo(RemoveTripFromCollectionModal);
