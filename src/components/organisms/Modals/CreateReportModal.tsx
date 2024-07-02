import { memo } from "react";
import { ModalTemplate, ReportForm } from "@/src/components/organisms";
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
    <ModalTemplate 
      onClose={onClose}
      title="Report issue"
      subtitle="Describe your problem and our support will contact you ASAP🫡"
    >
      {type === 'Comment' ? (
        <ReportForm closeModal={onClose} type={type} comment={comment} />
      ) : (
        <ReportForm closeModal={onClose} type={type}/>
      )}
    </ModalTemplate>
  );
};

export default memo(CreateReportModal);
