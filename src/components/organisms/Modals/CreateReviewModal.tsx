import { memo } from "react";
import { Heading } from "@/src/components/atoms";
import { ModalSkeleton } from "@/src/components/organisms";
import CreateReviewForm from "../Forms/CreateReviewForm";

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
