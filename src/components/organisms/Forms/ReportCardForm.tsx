'use client';

import { useNormalizedError } from "@/src/hooks/useNormalizedError";
import { trimObjectFields } from "@/src/lib/helpers";
import { useReportCard } from "@/src/queries";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ErrorText } from "@/src/components/atoms";
import { TextAreaInput, PrimaryButton } from "@/src/components/moleculs";
import { useParams } from "next/navigation";
import { reportCardSchema } from "@/src/validation";

type Props = {
  closeModal: () => void;
};

type ReportCardFormData = {
  text: string;
};

const ReportCardForm: React.FC<Props> = ({ closeModal }) => {
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useNormalizedError();

  const validationSchema = reportCardSchema();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ReportCardFormData>({
    values: {
      text: '',
    },
    resolver: yupResolver(validationSchema),
  });

  const handleError = (error: any) => {
    setErrorMessage(error.message);
  };

  const { isPending, mutate, isError } = useReportCard();

  const onSubmit = async (data: ReportCardFormData) => {
    const { text } = trimObjectFields(data);
    
    if (id) {
      mutate({text, cardId: +id}, {
        onError: handleError,
        onSuccess: () => closeModal(),
      });
    }
  };

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="w-full flex flex-col gap-8"
    >
      <TextAreaInput
        name="text"
        control={control}
        errorText={errors.text?.message}
        disabled={isPending}
        placeholder="Type your issue here..."
      />
      <PrimaryButton type="submit" text="Send" />

      {isError && <ErrorText errorText={errorMessage} />}
    </form>
  );
};

export default ReportCardForm;