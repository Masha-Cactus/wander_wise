'use client';

import { useConfirmEmail } from "@/src/queries/auth.queries";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PrimaryButton } from "@/src/components/moleculs/";
import { FormErrorText } from "../../atoms";
import TextInput from "../../moleculs/Inputs/TextInput";
import { confirmEmailSchema } from "@/src/validation/confirmEmailSchema";
import { useNormalizedError } from "@/src/hooks/useNormalizedError";

interface FormData {
  confirmationCode: string,
};

type Props = {
  closeModal: () => void;
};

const ConfirmEmailForm: React.FC<Props> = ({ closeModal }) => {
  const [errorMessage, setErrorMessage] = useNormalizedError();
  const validationSchema = confirmEmailSchema();

  const { 
    register, 
    handleSubmit,
    formState: { errors }, 
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      confirmationCode: '',
    },
    mode: 'onBlur',
  });

  const handleError = (error: any) => {
    setErrorMessage(error.message);
  };

  const { isPending, mutate, isError } = useConfirmEmail();

  const onSubmit: SubmitHandler<FormData> = async(data) => {
    mutate(data.confirmationCode, {
      onError: handleError,
      onSuccess: () => {
        reset();
        closeModal();
      },
    });
  };

  return (
    <form 
      className="flex flex-col gap-4 h-full w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextInput 
        type="text"
        name="confirmationCode"
        label="Confirmation Code"
        placeholder="Enter code from email"
        register={register}
        errorText={errors.confirmationCode?.message}
        disabled={isPending}
      />
      <PrimaryButton type="submit" text="Confirm" disabled={isPending}/>
      {isError && <FormErrorText errorText={errorMessage} />}
    </form>
  );
};

export default ConfirmEmailForm;