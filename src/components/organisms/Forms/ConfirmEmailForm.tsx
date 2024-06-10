'use client';

import { useConfirmEmail } from "@/src/queries";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PrimaryButton } from "@/src/components/molecules";
import { ErrorText } from "@/src/components/atoms";
import { TextInput }from "@/src/components/molecules";
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
    handleSubmit,
    control,
    formState: { errors }, 
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      confirmationCode: '',
    },
  });

  const { isPending, mutate, isError } = useConfirmEmail();

  const onSubmit: SubmitHandler<FormData> = async({confirmationCode}) => {
    mutate(confirmationCode, {
      onError: (e) => setErrorMessage(e),
      onSuccess: closeModal,
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
        control={control}
        errorText={errors.confirmationCode?.message}
        disabled={isPending}
      />
      <PrimaryButton type="submit" text="Confirm" disabled={isPending}/>
      {isError && <ErrorText errorText={errorMessage} />}
    </form>
  );
};

export default ConfirmEmailForm;