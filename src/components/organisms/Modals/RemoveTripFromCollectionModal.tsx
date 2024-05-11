import { memo } from "react";
import { ModalSkeleton } from "@/src/components/organisms";
import { Heading, Text } from "@/src/components/atoms";

interface RemoveTripFromCollectionModalProps {
  tripName: string;
  collectionName: string;
  onClose: () => void;
}

const RemoveTripFromCollectionModal: React.FC<
RemoveTripFromCollectionModalProps
> = ({ tripName, collectionName, onClose }) => {
  return(
    <ModalSkeleton onClose={onClose}>
      <Heading text={`Remove ${tripName} from ${collectionName}?`} />
      <Text text="This action cannot be undone 🫣"/>
    </ModalSkeleton>
  );
};

export default memo(RemoveTripFromCollectionModal);
