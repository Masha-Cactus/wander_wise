import { memo } from "react";
import { ModalSkeleton } from "@/src/components/organisms";
import { Heading, Text } from "@/src/components/atoms";
import { RoundedButton } from "@/src/components/moleculs";
import { ICard } from "@/src/services";

interface RemoveTripFromCollectionModalProps {
  trip: ICard;
  collectionName: string;
  onClose: () => void;
}

const RemoveTripFromCollectionModal: React.FC<
RemoveTripFromCollectionModalProps
> = ({ trip, collectionName, onClose }) => {
  const handleRemoveTrip = () => {};

  return (
    <ModalSkeleton onClose={onClose}>
      <Heading text={`Remove ${trip.name} from ${collectionName}?`} />
      <Text text="This action cannot be undone 🫣" />

      <div className="">
        <RoundedButton
          text="Delete"
          onClick={handleRemoveTrip}
          classes="bg-red text-white"
        />
        <RoundedButton
          text="Cancel"
          onClick={onClose}
          classes="bg-white text-black border border-black"
        />
      </div>
    </ModalSkeleton>
  );
};

export default memo(RemoveTripFromCollectionModal);
