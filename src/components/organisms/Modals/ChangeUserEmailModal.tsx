import { memo } from "react";
import { Heading } from "@/src/components/atoms";
import { ModalSkeleton } from "@/src/components/organisms";

interface ChangeUserEmailModalProps {
  onClose: () => void;
}

// todo
// add form
const ChangeUserEmailModal: React.FC<ChangeUserEmailModalProps> = ({
  onClose,
}) => {
  return (
    <ModalSkeleton onClose={onClose}>
      <Heading text="Change Email" font="normal"/>

      <p className="">Form</p>
    </ModalSkeleton>
  );
};

export default memo(ChangeUserEmailModal);
