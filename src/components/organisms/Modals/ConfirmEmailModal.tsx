import { memo } from "react";
import { 
  ConfirmEmailForm, 
  ModalSkeleton, 
  ConfirmNewEmailForm 
} from "@/src/components/organisms";
import { Heading, Heading4 } from "@/src/components/atoms";

interface ConfirmEmailModalProps {
  onClose: () => void;
  type: 'Confirm' | 'Update',
}

const ConfirmEmailModal: React.FC<ConfirmEmailModalProps> 
= ({ onClose, type }) => {
  return (
    <ModalSkeleton onClose={onClose}>
      <Heading text="Confirm your email" font="normal" />
      <Heading4
        text="Enter the confirmation code sent to your email 🤔"
        font="normal"
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
