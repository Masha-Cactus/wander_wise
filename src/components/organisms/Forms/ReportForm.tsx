'use client';

import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "next/navigation";
import { useNormalizedError } from "@/src/hooks";
import { trimObjectFields } from "@/src/lib/helpers";
import { useReportCard, useReportComment } from "@/src/queries";
import { ErrorText } from "@/src/components/atoms";
import { TextAreaInput, PrimaryButton } from "@/src/components/molecules";
import { reportCardSchema } from "@/src/validation";
import { IComment } from "@/src/services";

interface ReportFormProps {
  closeModal: () => void;
  type: 'Card' | 'Comment';
  comment?: IComment;
};

interface ReportFormData {
  text: string;
}

const ReportForm: React.FC<ReportFormProps> 
= ({ closeModal, type, comment }) => {
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useNormalizedError();

  const validationSchema = reportCardSchema();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ReportFormData>({
    values: {
      text: '',
    },
    resolver: yupResolver(validationSchema),
  });
  
  const { 
    isPending: isReportCardPending, 
    mutate: reportCard, 
  } = useReportCard();

  const { 
    isPending: isReportCommentPending, 
    mutate: reportComment,
  } = useReportComment();

  const isPending = isReportCardPending || isReportCommentPending;

  const mutationOptions = {
    onError: (e: any) => setErrorMessage(e),
    onSuccess: closeModal,
  };

  const onSubmit: SubmitHandler<ReportFormData> = (data) => {
    const { text } = trimObjectFields(data);

    if (type === 'Comment' && comment) {
      reportComment({ 
        reportText: text, 
        commentAuthor: comment.author, 
        commentText: comment.text,
        id: comment.id, 
      }, mutationOptions);

      return;
    }
    
    if (type === 'Card' && id) {
      reportCard({text, cardId: +id}, mutationOptions);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="flex w-full flex-col gap-8"
    >
      <TextAreaInput
        name="text"
        control={control}
        errorText={errors.text?.message}
        disabled={isPending}
        placeholder="Type your issue here..."
      />

      <PrimaryButton type="submit" text="Send" disabled={isPending} />

      {errorMessage && <ErrorText errorText={errorMessage} />}
    </form>
  );
};

export default ReportForm;