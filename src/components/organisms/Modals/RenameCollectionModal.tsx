import { memo } from "react";
import { 
  ModalTemplate,
  ChangeCollectionNameForm
} from "@/src/components/organisms";

interface RenameCollectionModalProps {
  onClose: () => void;
}

const RenameCollectionModal: React.FC<RenameCollectionModalProps> = ({
  onClose,
}) => {
  return (
    <ModalTemplate 
      onClose={onClose}
      title="Change collection name"
    >
      <ChangeCollectionNameForm
        closeModal={onClose}
      />
    </ModalTemplate>
  );
};

export default memo(RenameCollectionModal);