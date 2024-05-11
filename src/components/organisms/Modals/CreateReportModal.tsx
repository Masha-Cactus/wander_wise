import { memo } from "react";
import { Heading, Text } from "@/src/components/atoms";
import { ModalSkeleton } from "@/src/components/organisms";

interface CreateReportModalProps {
  onClose: () => void;
  onOpenRestorePasswordModal: () => void;
  children: React.ReactNode;
}

const CreateReportModal: React.FC<CreateReportModalProps> = ({
  onClose,
  children,
}) => {
  return (
    <ModalSkeleton onClose={onClose}>
      <Heading text="Report issue" />
      <Text text={`Describe your problem and 
      our support will contact you ASAP🫡`} />

      {children}

    </ModalSkeleton>
  );
};

export default memo(CreateReportModal);
