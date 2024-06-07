import { memo } from "react";
import { ModalSkeleton, ReportForm } from "@/src/components/organisms";
import { IComment } from "@/src/services";

interface CreateReportModalProps {
  onClose: () => void;
  type: 'Card' | 'Comment',
  comment?: IComment,
}

const CreateReportModal: React.FC<CreateReportModalProps> = ({
  onClose, type, comment
}) => {
  return (
    <ModalSkeleton 
      onClose={onClose}
      title="Report issue"
      subtitle="Describe your problem and our support will contact you ASAP🫡"
    >
      {type === 'Comment' ? (
        <ReportForm closeModal={onClose} type={type} comment={comment} />
      ) : (
        <ReportForm closeModal={onClose} type={type}/>
      )}
    </ModalSkeleton>
  );
};

export default memo(CreateReportModal);
