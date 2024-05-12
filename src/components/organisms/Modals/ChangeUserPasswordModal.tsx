import { memo } from "react";
import { Heading } from "@/src/components/atoms";
import { ModalSkeleton } from "@/src/components/organisms";
import { UnstyledButton } from "@/src/components/moleculs";

interface ChangeUserPasswordModalProps {
  onClose: () => void;
  onOpenRestorePasswordModal: () => void;
}

// todo
// add form
const ChangeUserPasswordModal: React.FC<ChangeUserPasswordModalProps> = ({
  onClose,
  onOpenRestorePasswordModal,
}) => {
  return (
    <ModalSkeleton onClose={onClose}>
      <Heading text="Change Password" font="normal"/>

      <p className="">Form</p>

      <UnstyledButton
        text="Forgot Password?"
        onClick={onOpenRestorePasswordModal}
      />
    </ModalSkeleton>
  );
};

export default memo(ChangeUserPasswordModal);
