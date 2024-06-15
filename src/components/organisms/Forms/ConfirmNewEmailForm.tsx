'use client';

import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PrimaryButton, TextInput } from "@/src/components/molecules";
import { ErrorText } from "@/src/components/atoms";
import { confirmEmailSchema } from "@/src/validation";
import { useNormalizedError } from "@/src/hooks";
import { useUpdateEmail } from "@/src/queries";

interface FormData {
  confirmationCode: string,
};

type Props = {
  closeModal: () => void;
};

const ConfirmNewEmailForm: React.FC<Props> = ({ closeModal }) => {
  const [errorMessage, setErrorMessage] = useNormalizedError();
  const validationSchema = confirmEmailSchema();

  const { 
    handleSubmit,
    control,
    formState: { errors }, 
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      confirmationCode: '',
    },
  });

  const { isPending, mutate, isError } = useUpdateEmail();

  const onSubmit: SubmitHandler<FormData> = async({confirmationCode}) => {
    mutate(confirmationCode, {
      onError: (e) => setErrorMessage(e),
      onSuccess: closeModal,
    });
  };

  return (
    <form 
      className="flex h-full w-full flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextInput 
        type="text"
        name="confirmationCode"
        label="Confirmation Code"
        placeholder="Enter code from email"
        control={control}
        errorText={errors.confirmationCode?.message}
        disabled={isPending}
      />
      <PrimaryButton type="submit" text="Confirm" disabled={isPending}/>
      {isError && <ErrorText errorText={errorMessage} />}
    </form>
  );
};

export default ConfirmNewEmailForm;