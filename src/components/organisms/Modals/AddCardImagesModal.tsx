import { memo } from "react";
import { 
  ModalSkeleton, 
  UploadCardImagesForm 
} from "@/src/components/organisms";

interface AddCardImagesModalProps {
  onClose: () => void;
  cardId: number,
}

const AddCardImagesModal: React.FC<AddCardImagesModalProps> = ({
  onClose,
  cardId,
}) => {
  return (
    <ModalSkeleton 
      onClose={onClose}
      title="Add images for your card"
    >
      <UploadCardImagesForm cardId={cardId} closeModal={onClose} />
    </ModalSkeleton>
  );
};

export default memo(AddCardImagesModal);