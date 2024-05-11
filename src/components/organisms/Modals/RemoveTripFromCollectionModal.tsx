import { memo, useState } from "react";
import { ModalSkeleton } from "@/src/components/organisms";
import { ErrorText, Heading, Text } from "@/src/components/atoms";
import { RoundedButton } from "@/src/components/moleculs";
import { ICard, ICollection, IUpdateCollection } from "@/src/services";
import { useUpdateCollection } from "@/src/queries";
import { normalizeError } from "@/src/lib/helpers";

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
  const [errorMessage, setErrorMessage] = useState("");

  const updatedCollection = collection.cards
    .filter((card) => card.id !== trip.id)
    .map((card) => card.id);

  const handleError = (error: any) => {
    setErrorMessage(normalizeError(error.message));
  };

  const handleRemoveTrip = () => {
    const data: IUpdateCollection = {
      ...collection,
      cardIds: updatedCollection,
    };

    mutate(data, { onError: handleError });
    onClose();
  };

  return (
    <ModalSkeleton onClose={onClose}>
      <Heading text={`Remove ${trip.name} from ${collection.name}?`} />
      <Text text="This action cannot be undone 🫣" />

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
