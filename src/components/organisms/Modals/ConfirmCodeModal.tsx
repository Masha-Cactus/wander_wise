import { ModalSkeleton } from "@/src/components/organisms";
import { Heading, Heading4 } from "@/src/components/atoms";
import { memo } from "react";

interface ConfirmCodeModalProps {
  onClose: () => void;
}

// todo
// add form
const ConfirmCodeModal: React.FC<ConfirmCodeModalProps> = ({
  onClose,
}) => {
  return (
    <ModalSkeleton onClose={onClose}>
      <Heading text="Confirm code" font="normal" />
      <Heading4
        text="Enter the code we sent to your email address 🤔"
        font="medium"
      />
    </ModalSkeleton>
  );
};

export default memo(ConfirmCodeModal);
