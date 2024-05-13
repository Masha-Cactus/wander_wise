'use client';

import { useNormalizedError } from '@/src/hooks/useNormalizedError';
import { useRestorePassword } from '@/src/queries';
import { IEmail } from '@/src/services';
import { restorePasswordSchema } from '@/src/validation/restorePasswordSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormErrorText, Text } from '@/src/components/atoms';
import { PrimaryButton, TextInput } from '@/src/components/moleculs';

const RestorePasswordForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useNormalizedError();
  const validationSchema = restorePasswordSchema();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IEmail>({
    values: {
      email: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const { isPending, mutate, isError } = useRestorePassword();

  const handleError = (error: any) => {
    setErrorMessage(error.message);
  };

  const onSubmit: SubmitHandler<IEmail> = async(data) => {
    mutate(data, {
      onError: handleError,
      onSuccess: () => {
        reset();
        setIsSubmitted(true);
      },
    });
  };

  if (isSubmitted) {
    return <Text text="Your new password will be sent to your email"/>;
  }

  return (
    <form
      className="flex flex-col gap-4 h-full w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextInput 
        type="email"
        name="email"
        label="Email"
        register={register}
        errorText={errors.email?.message}
        disabled={isPending}
      />

      <PrimaryButton text="Continue" disabled={isPending} type='submit' />

      {isError && <FormErrorText errorText={errorMessage} />}
    </form>
  );
};

export default RestorePasswordForm;