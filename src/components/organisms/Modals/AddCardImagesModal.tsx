import { memo } from "react";
import { 
  ModalTemplate, 
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
    <ModalTemplate 
      onClose={onClose}
      title="Add images for your card"
    >
      <UploadCardImagesForm cardId={cardId} closeModal={onClose} />
    </ModalTemplate>
  );
};

export default memo(AddCardImagesModal);