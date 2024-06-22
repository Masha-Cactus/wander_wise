import { memo } from "react";
import { ConfirmEmailForm, ModalTemplate } from "@/src/components/organisms";

interface ConfirmEmailModalProps {
  onClose: () => void;
}

const ConfirmEmailModal: React.FC<ConfirmEmailModalProps> = ({ onClose }) => {
  return (
    <ModalTemplate onClose={onClose}
      title="Confirm your email"
      subtitle="Enter the confirmation code sent to your email 🤔"
    >
      <ConfirmEmailForm closeModal={onClose} />
    </ModalTemplate>
  );
};

export default memo(ConfirmEmailModal);
