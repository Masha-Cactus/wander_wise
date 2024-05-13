/* eslint-disable max-len */
import { memo } from "react";
import { ConfirmEmailForm, ModalSkeleton } from "@/src/components/organisms";
import { Heading, Text } from "@/src/components/atoms";

interface ConfirmEmailModalProps {
  onClose: () => void;
}

const ConfirmEmailModal: React.FC<ConfirmEmailModalProps> = ({
  onClose,
}) => {
  return (
    <ModalSkeleton onClose={onClose}>
      <Heading text="Password assistance" />
      <Text text="Enter the email address associated with your WanderWise account 🤔" />

      <ConfirmEmailForm closeModal={onClose}/>

    </ModalSkeleton>
  );
};

export default memo(ConfirmEmailModal);
