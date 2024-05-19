import { memo } from "react";
import { Heading } from "@/src/components/atoms";
import { 
  ModalSkeleton, 
  UploadCardImagesForm 
} from "@/src/components/organisms";

interface CreateReviewModalProps {
  onClose: () => void;
  cardId: number,
}

const AddCardImagesModal: React.FC<CreateReviewModalProps> = ({
  onClose,
  cardId,
}) => {
  return (
    <ModalSkeleton onClose={onClose}>
      <Heading text="Add images for your card" font="normal"/>

      <UploadCardImagesForm cardId={cardId} closeModal={onClose} />
    </ModalSkeleton>
  );
};

export default memo(AddCardImagesModal);