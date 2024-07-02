import { memo } from "react";
import { ModalTemplate, CreateReviewForm } from "@/src/components/organisms";

interface CreateReviewModalProps {
  onClose: () => void;
}

const CreateReviewModal: React.FC<CreateReviewModalProps> = ({
  onClose,
}) => {
  return (
    <ModalTemplate 
      onClose={onClose}
      title="How was your experience?"
    >
      <CreateReviewForm closeModal={onClose} />
    </ModalTemplate>
  );
};

export default memo(CreateReviewModal);
