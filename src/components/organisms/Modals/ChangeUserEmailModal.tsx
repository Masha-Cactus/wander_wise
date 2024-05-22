import { memo } from "react";
import { Heading2 } from "@/src/components/atoms";
import { ModalSkeleton, ChangeEmailForm } from "@/src/components/organisms";

interface ChangeUserEmailModalProps {
  onClose: () => void;
  onOpenConfirmEmail: () => void;
}

const ChangeUserEmailModal: React.FC<ChangeUserEmailModalProps> = ({
  onClose,
  onOpenConfirmEmail,
}) => {
  return (
    <ModalSkeleton onClose={onClose}>
      <Heading2 text="Change email" font="semibold" classes="self-start" />

      <ChangeEmailForm openConfirmEmailModal={onOpenConfirmEmail} />

    </ModalSkeleton>
  );
};

export default memo(ChangeUserEmailModal);
