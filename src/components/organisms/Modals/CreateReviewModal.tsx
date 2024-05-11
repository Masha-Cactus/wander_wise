import { memo } from "react";
import { Heading } from "@/src/components/atoms";
import { ModalSkeleton } from "@/src/components/organisms";

interface CreateReviewModalProps {
  onClose: () => void;
}

// todo
// add form

const CreateReviewModal: React.FC<CreateReviewModalProps> = ({
  onClose,
}) => {
  return (
    <ModalSkeleton onClose={onClose}>
      <Heading text="How was your experience?" />
    </ModalSkeleton>
  );
};

export default memo(CreateReviewModal);
