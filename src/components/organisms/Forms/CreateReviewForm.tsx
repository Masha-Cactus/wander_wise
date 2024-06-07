'use client';

import { useNormalizedError } from "@/src/hooks";
import { useCreateComment } from "@/src/queries";
import { ICreateComment } from "@/src/services";
import { createReviewSchema } from "@/src/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { ErrorText } from "@/src/components/atoms";
import { 
  PrimaryButton, 
  TextAreaInput, 
  StarsInput, 
} from "@/src/components/molecules";
import { useParams } from "next/navigation";

type Props = {
  closeModal: () => void,
};

const CreateReviewForm: React.FC<Props> = ({ closeModal }) => {
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useNormalizedError();
  const validationSchema = createReviewSchema();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Omit<ICreateComment, 'cardId'>>({
    values: {
      text: "",
      stars: 0,
    },
    resolver: yupResolver(validationSchema),
  });

  const handleError = (error: any) => {
    setErrorMessage(error.message);
  };

  const { isPending, mutate, isError } = useCreateComment();

  const onSubmit: SubmitHandler<Omit<ICreateComment, 'cardId'>> 
  = async(data) => {
    mutate({...data, cardId: +id}, {
      onError: handleError,
      onSuccess: () => {
        reset();
        closeModal();
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-6"
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

      {isError && <ErrorText errorText={errorMessage} />}
    </form>
  );
};

export default CreateReviewForm;