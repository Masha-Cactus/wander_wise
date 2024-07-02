import { memo } from "react";
import { Heading2 } from "@/src/components/atoms";
import { ModalTemplate, ChangePasswordForm } from "@/src/components/organisms";

interface ChangeUserPasswordModalProps {
  onClose: () => void;
  onOpenRestorePasswordModal: () => void;
}

const ChangeUserPasswordModal: React.FC<ChangeUserPasswordModalProps> = ({
  onClose,
  onOpenRestorePasswordModal,
}) => {
  return (
    <ModalTemplate onClose={onClose}>
      <Heading2 text="Change password" font="semibold" classes="self-start"/>

      <ChangePasswordForm 
        closeModal={onClose} 
        openRestorePasswordModal={onOpenRestorePasswordModal} 
      />
    </ModalTemplate>
  );
};

export default memo(ChangeUserPasswordModal);
