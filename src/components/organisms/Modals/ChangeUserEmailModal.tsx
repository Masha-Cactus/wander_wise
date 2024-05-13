import { memo } from "react";
import { Heading } from "@/src/components/atoms";
import { ModalSkeleton } from "@/src/components/organisms";
import ChangeEmailForm from "../Forms/ChangeEmailForm";

interface ChangeUserEmailModalProps {
  onClose: () => void;
}

const ChangeUserEmailModal: React.FC<ChangeUserEmailModalProps> = ({
  onClose,
}) => {
  return (
    <ModalSkeleton onClose={onClose}>
      <Heading text="Change Email" />

      <ChangeEmailForm />

      <p className="">Form</p>
    </ModalSkeleton>
  );
};

export default memo(ChangeUserEmailModal);
