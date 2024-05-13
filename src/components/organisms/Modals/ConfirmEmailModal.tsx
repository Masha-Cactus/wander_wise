/* eslint-disable max-len */
import { memo } from "react";
import { ConfirmEmailForm, ModalSkeleton } from "@/src/components/organisms";
import { Heading, Heading4 } from "@/src/components/atoms";

interface ConfirmEmailModalProps {
  onClose: () => void;
}

const ConfirmEmailModal: React.FC<ConfirmEmailModalProps> = ({ onClose }) => {
  return (
    <ModalSkeleton onClose={onClose}>
      <Heading text="Password assistance" font="normal" />
      <Heading4
        text="Enter the confirmation code sent to your email 🤔"
        font="medium"
      />

      <ConfirmEmailForm closeModal={onClose} />
    </ModalSkeleton>
  );
};

export default memo(ConfirmEmailModal);
