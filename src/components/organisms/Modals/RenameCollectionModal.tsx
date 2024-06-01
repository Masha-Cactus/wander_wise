import { memo } from "react";
import { Heading } from "@/src/components/atoms";
import { 
  ModalSkeleton,
  ChangeCollectionNameForm
} from "@/src/components/organisms";

interface RenameCollectionModalProps {
  onClose: () => void;
}

const RenameCollectionModal: React.FC<RenameCollectionModalProps> = ({
  onClose,
}) => {
  return (
    <ModalSkeleton onClose={onClose}>
      <Heading text="Change collection name" font="normal"/>

      <ChangeCollectionNameForm
        closeModal={onClose}
      />

    </ModalSkeleton>
  );
};

export default memo(RenameCollectionModal);