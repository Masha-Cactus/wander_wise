import { memo } from "react";
import { Heading2 } from "@/src/components/atoms";
import { ModalSkeleton, ChangeEmailForm } from "@/src/components/organisms";

interface ChangeUserEmailModalProps {
  onClose: () => void;
}

const ChangeUserEmailModal: React.FC<ChangeUserEmailModalProps> = ({
  onClose,
}) => {
  return (
    <ModalSkeleton onClose={onClose}>
      <Heading2 text="Change email" font="semibold" classes="self-start" />

      <ChangeEmailForm />

    </ModalSkeleton>
  );
};

export default memo(ChangeUserEmailModal);
