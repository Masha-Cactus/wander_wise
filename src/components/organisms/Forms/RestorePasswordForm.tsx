'use client';

import { Dispatch, SetStateAction } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNormalizedError } from '@/src/hooks';
import { useRestorePassword } from '@/src/queries';
import { IEmail } from '@/src/services';
import { restorePasswordSchema } from '@/src/validation';
import { ErrorText } from '@/src/components/atoms';
import { PrimaryButton, TextInput } from '@/src/components/molecules';

interface RestorePasswordFormProps {
  setIsSubmitted: Dispatch<SetStateAction<boolean>>,
}

const RestorePasswordForm: React.FC<RestorePasswordFormProps> 
= ({ setIsSubmitted }) => {
  const [errorMessage, setErrorMessage] = useNormalizedError();
  const validationSchema = restorePasswordSchema();

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

  const { isPending, mutate } = useRestorePassword();

  const onSubmit: SubmitHandler<IEmail> = (data) => {
    mutate(data, {
      onError: (e) => setErrorMessage(e),
      onSuccess: () => setIsSubmitted(true),
    });
  };

  return (
    <form
      className="flex h-full w-full flex-col gap-12"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextInput 
        type="email"
        name="email"
        label="Email"
        control={control}
        errorText={errors.email?.message}
        disabled={isPending}
      />

      <PrimaryButton 
        text="Continue" 
        disabled={isPending} 
        type='submit' 
      />

      {errorMessage && <ErrorText errorText={errorMessage} />}
    </form>
  );
};

export default RestorePasswordForm;