'use client';

import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "next/navigation";
import { useNormalizedError } from "@/src/hooks";
import { useCreateComment } from "@/src/queries";
import { ICreateComment } from "@/src/services";
import { reviewSchema } from "@/src/validation";
import { ErrorText } from "@/src/components/atoms";
import { 
  PrimaryButton, 
  TextAreaInput, 
  StarsInput, 
} from "@/src/components/molecules";

interface CreateReviewFormProps {
  closeModal: () => void,
}

type CreateReviewFormData = Omit<ICreateComment, 'cardId'>;

const CreateReviewForm: React.FC<CreateReviewFormProps> = ({ closeModal }) => {
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useNormalizedError();
  const validationSchema = reviewSchema();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateReviewFormData>({
    values: {
      text: "",
      stars: 0,
    },
    resolver: yupResolver(validationSchema),
  });

  const { isPending, mutate } = useCreateComment();

  const onSubmit: SubmitHandler<CreateReviewFormData> = (data) => {
    mutate({...data, cardId: +id}, {
      onError: (e) => setErrorMessage(e),
      onSuccess: closeModal,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-6"
    >
      <StarsInput control={control} name="stars" />

      <TextAreaInput 
        control={control} 
        name="text" 
        placeholder="Write your review..."
        disabled={isPending}
        errorText={errors.text?.message}
      />

      <PrimaryButton text="Send" type="submit" disabled={isPending} />

      {errorMessage && <ErrorText errorText={errorMessage} />}
    </form>
  );
};

export default CreateReviewForm;