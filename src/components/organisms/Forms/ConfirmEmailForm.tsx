'use client';

import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PrimaryButton, TextInput } from "@/src/components/molecules";
import { ErrorText } from "@/src/components/atoms";
import { useConfirmEmail, useUpdateEmail } from "@/src/queries";
import { confirmEmailSchema } from "@/src/validation";
import { useNormalizedError } from "@/src/hooks";

interface ConfirmEmailFormProps {
  closeModal: () => void;
}

interface ConfirmEmailFormData {
  confirmationCode: string,
};

const ConfirmEmailForm: React.FC<ConfirmEmailFormProps> = ({ closeModal }) => {
  const emailConfirmationType = localStorage.getItem('emailConfirmationType');

  const [errorMessage, setErrorMessage] = useNormalizedError();
  const validationSchema = confirmEmailSchema();

  const { 
    handleSubmit,
    control,
    formState: { errors }, 
  } = useForm<ConfirmEmailFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      confirmationCode: '',
    },
  });

  const { 
    isPending: isConfirmPending, 
    mutate: confirm, 
  } = useConfirmEmail();
  const { 
    isPending: isUpdatePending, 
    mutate: update, 
  } = useUpdateEmail();
  const isPending = isConfirmPending || isUpdatePending;
  const mutationOptions = {
    onError: (e: any) => setErrorMessage(e),
    onSuccess: closeModal,
  };

  const onSubmit: SubmitHandler<ConfirmEmailFormData> 
  = ({ confirmationCode }) => {
    if (emailConfirmationType === 'update') {
      update(confirmationCode, mutationOptions);
    } else {
      confirm(confirmationCode, mutationOptions);
    }
  };

  return (
    <form 
      className="flex h-full w-full flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextInput 
        type="text"
        name="confirmationCode"
        placeholder="Enter code from email"
        control={control}
        errorText={errors.confirmationCode?.message}
        disabled={isPending}
      />

      <PrimaryButton type="submit" text="Confirm" disabled={isPending}/>

      {errorMessage && <ErrorText errorText={errorMessage} />}
    </form>
  );
};

export default ConfirmEmailForm;