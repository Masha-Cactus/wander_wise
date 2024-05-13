import { memo } from "react";
import { Heading2 } from "@/src/components/atoms";
import { ModalSkeleton, ChangePasswordForm } from "@/src/components/organisms";
import { UnstyledButton } from "@/src/components/moleculs";

interface ChangeUserPasswordModalProps {
  onClose: () => void;
  onOpenRestorePasswordModal: () => void;
}

const ChangeUserPasswordModal: React.FC<ChangeUserPasswordModalProps> = ({
  onClose,
  onOpenRestorePasswordModal,
}) => {
  return (
    <ModalSkeleton onClose={onClose}>
      <Heading2 text="Change password" font="semibold" classes="self-start"/>

      <ChangePasswordForm />

      <UnstyledButton
        text="Forgot Password?"
        onClick={onOpenRestorePasswordModal}
      />
    </ModalSkeleton>
  );
};

export default memo(ChangeUserPasswordModal);
