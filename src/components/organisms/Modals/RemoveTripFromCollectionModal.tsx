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

const RemoveTripFromCollectionModal: React.FC<
RemoveTripFromCollectionModalProps
> = ({ trip, collectionId, onClose }) => {
  const { isPending, mutate, isError } = useUpdateCollection();
  const [errorMessage, setErrorMessage] = useNormalizedError();
  const { data: collection } = useGetCollection(collectionId);

  const handleError = (error: any) => {
    setErrorMessage(error);
  };

  const handleRemoveTrip = () => {
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
      <h1 className="text-4xl font-normal leading-normal">
        Remove “
        <span className="font-medium">{trip.name}</span>
        ” from {collection?.name}?
      </h1>
      <Heading4 text="This action cannot be undone 🫣" font="normal"/>

      <div className="w-full grid grid-cols-2 gap-5">
        <RoundedButton
          text="Delete"
          onClick={handleRemoveTrip}
          style="red"
          disabled={isPending}
        />
        <RoundedButton
          text="Cancel"
          onClick={onClose}
          style="light"
        />
      </div>

      {(isError) && <ErrorText errorText={errorMessage} />}
    </ModalSkeleton>
  );
};

export default memo(RemoveTripFromCollectionModal);
