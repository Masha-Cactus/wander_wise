import { memo } from "react";
import { Heading } from "@/src/components/atoms";
import { ModalSkeleton, CreateReviewForm } from "@/src/components/organisms";

interface CreateReviewModalProps {
  onClose: () => void;
}

const CreateReviewModal: React.FC<CreateReviewModalProps> = ({
  onClose,
}) => {
  return (
    <ModalSkeleton onClose={onClose}>
      <Heading text="How was your experience?" font="normal"/>

      <CreateReviewForm closeModal={onClose} />
    </ModalSkeleton>
  );
};

export default memo(CreateReviewModal);
