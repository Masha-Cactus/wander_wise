import { memo } from "react";
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
    <ModalSkeleton 
      onClose={onClose}
      title="Change collection name"
    >
      <ChangeCollectionNameForm
        closeModal={onClose}
      />
    </ModalSkeleton>
  );
};

export default memo(RenameCollectionModal);