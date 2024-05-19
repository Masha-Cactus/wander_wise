/* eslint-disable max-len */
import { memo } from "react";
import { ConfirmEmailForm, ModalSkeleton } from "@/src/components/organisms";
import { Heading, Heading4 } from "@/src/components/atoms";
import ConfirmNewEmailForm from "../Forms/ConfirmNewEmailForm";

interface ConfirmEmailModalProps {
  onClose: () => void;
  type: 'Confirm' | 'Update',
}

const ConfirmEmailModal: React.FC<ConfirmEmailModalProps> = ({ onClose, type }) => {
  return (
    <ModalSkeleton onClose={onClose}>
      <Heading text="Password assistance" font="normal" />
      <Heading4
        text="Enter the confirmation code sent to your email 🤔"
        font="medium"
      />

      {type === 'Confirm' ? (
        <ConfirmEmailForm closeModal={onClose} />
      ) : (
        <ConfirmNewEmailForm closeModal={onClose} />
      )}

      
    </ModalSkeleton>
  );
};

export default memo(ConfirmEmailModal);
