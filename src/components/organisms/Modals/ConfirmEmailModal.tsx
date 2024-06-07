import { memo } from "react";
import { 
  ConfirmEmailForm, 
  ModalSkeleton, 
  ConfirmNewEmailForm 
} from "@/src/components/organisms";

interface ConfirmEmailModalProps {
  onClose: () => void;
  type: 'Confirm' | 'Update',
}

const ConfirmEmailModal: React.FC<ConfirmEmailModalProps> 
= ({ onClose, type }) => {
  return (
    <ModalSkeleton onClose={onClose}
      title="Confirm your email"
      subtitle="Enter the confirmation code sent to your email 🤔"
    >
      {type === 'Confirm' ? (
        <ConfirmEmailForm closeModal={onClose} />
      ) : (
        <ConfirmNewEmailForm closeModal={onClose} />
      )}
    </ModalSkeleton>
  );
};

export default memo(ConfirmEmailModal);
