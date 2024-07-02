import { memo } from "react";
import { ModalTemplate, EditReviewForm } from "@/src/components/organisms";
import { IComment } from "@/src/services";

interface EditReviewModalProps {
  onClose: () => void;
  review: IComment
}

const EditReviewModal: React.FC<EditReviewModalProps> 
= ({ onClose, review }) => {
  return (
    <ModalTemplate 
      onClose={onClose}
      title="Edit your comment"
    >
      <EditReviewForm closeModal={onClose} review={review} />
    </ModalTemplate>
  );
};

export default memo(EditReviewModal);