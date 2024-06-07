import { memo } from "react";
import { ModalSkeleton, CreateReviewForm } from "@/src/components/organisms";

interface CreateReviewModalProps {
  onClose: () => void;
}

const CreateReviewModal: React.FC<CreateReviewModalProps> = ({
  onClose,
}) => {
  return (
    <ModalSkeleton 
      onClose={onClose}
      title="How was your experience?"
    >
      <CreateReviewForm closeModal={onClose} />
    </ModalSkeleton>
  );
};

export default memo(CreateReviewModal);
