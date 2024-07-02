'use client';

import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNormalizedError } from "@/src/hooks";
import { useUpdateComment } from "@/src/queries";
import { IComment, IUpdateComment } from "@/src/services";
import { reviewSchema } from "@/src/validation";
import { ErrorText } from "@/src/components/atoms";
import { 
  PrimaryButton, 
  TextAreaInput, 
  StarsInput, 
} from "@/src/components/molecules";

interface EditReviewFormProps {
  closeModal: () => void,
  review: IComment,
}

type EditReviewFormData = Omit<IUpdateComment, 'id' | 'cardId'>;

const EditReviewForm: React.FC<EditReviewFormProps> 
= ({ closeModal, review }) => {
  const [errorMessage, setErrorMessage] = useNormalizedError();
  const validationSchema = reviewSchema();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditReviewFormData>({
    values: {
      text: review.text,
      stars: review.stars,
    },
    resolver: yupResolver(validationSchema),
  });

  const { isPending, mutate } = useUpdateComment();

  const onSubmit: SubmitHandler<EditReviewFormData> = (data) => {
    mutate({...data, cardId: review.cardId, id: review.id}, {
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

      <PrimaryButton text="Save" type="submit" disabled={isPending} />

      {errorMessage && <ErrorText errorText={errorMessage} />}
    </form>
  );
};

export default EditReviewForm;