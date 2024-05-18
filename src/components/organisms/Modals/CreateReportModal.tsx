import { memo } from "react";
import { Heading, Heading4 } from "@/src/components/atoms";
import { ModalSkeleton, ReportCardForm } from "@/src/components/organisms";

interface CreateReportModalProps {
  onClose: () => void;
}

const CreateReportModal: React.FC<CreateReportModalProps> = ({
  onClose,
}) => {
  return (
    <ModalSkeleton onClose={onClose}>
      <Heading text="Report issue" font="normal" />
      <Heading4
        text={`Describe your problem and 
      our support will contact you ASAP🫡`}
        font="medium"
      />

      <ReportCardForm closeModal={onClose} />
    </ModalSkeleton>
  );
};

export default memo(CreateReportModal);
