'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNormalizedError } from '@/src/hooks';
import { useRequestUpdateEmail } from '@/src/queries';
import { IEmail } from '@/src/services';
import { ErrorText } from '@/src/components/atoms';
import { PrimaryButton, TextInput } from '@/src/components/molecules';
import { changeEmailSchema } from '@/src/validation';

interface ChangeEmailFormProps {
  openConfirmEmailModal: () => void;
}

const ChangeEmailForm: React.FC<ChangeEmailFormProps> 
= ({ openConfirmEmailModal }) => {
  const [errorMessage, setErrorMessage] = useNormalizedError();
  const validationSchema = changeEmailSchema();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IEmail>({
    values: {
      email: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const { isPending, mutate } = useRequestUpdateEmail();

  const onSubmit: SubmitHandler<IEmail> = (data) => {
    mutate(data.email, {
      onError: (e) => setErrorMessage(e),
      onSuccess: openConfirmEmailModal,
    });
  };

  return (
    <form
      className="flex h-full w-full flex-col gap-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextInput 
        type="email"
        name="email"
        label="New email"
        control={control}
        errorText={errors.email?.message}
        disabled={isPending}
      />

      <PrimaryButton text="Save" disabled={isPending} type='submit' />

      {errorMessage && <ErrorText errorText={errorMessage} />}
    </form>
  );
};

export default ChangeEmailForm;