import { memo } from "react";
import { 
  ConfirmEmailForm, 
  ModalSkeleton, 
  ConfirmNewEmailForm 
} from "@/src/components/organisms";
import { Heading, Heading4, Heading2 } from "@/src/components/atoms";

interface ConfirmEmailModalProps {
  onClose: () => void;
  type: 'Confirm' | 'Update',
}

const ConfirmEmailModal: React.FC<ConfirmEmailModalProps> 
= ({ onClose, type }) => {
  return (
    <ModalSkeleton onClose={onClose}>
      <Heading text="Password assistance" font="normal" />
      <Heading4
        text="Enter the confirmation code sent to your email 🤔"
        font="medium"
      />
      <Heading2 
        text="Please, don't close or reload the page until you enter the code"
        font="semibold"
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
