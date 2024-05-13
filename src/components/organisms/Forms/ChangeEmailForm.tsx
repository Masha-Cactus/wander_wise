'use client';

import { useNormalizedError } from '@/src/hooks/useNormalizedError';
import { useRequestUpdateEmail } from '@/src/queries';
import { IEmail } from '@/src/services';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ErrorText } from '@/src/components/atoms';
import { PrimaryButton, TextInput } from '@/src/components/moleculs';
import { changeEmailSchema } from '@/src/validation';

const ChangeEmailForm = () => {
  const [errorMessage, setErrorMessage] = useNormalizedError();
  const validationSchema = changeEmailSchema();

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IEmail>({
    values: {
      email: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const { isPending, mutate, isError } = useRequestUpdateEmail();

  const handleError = (error: any) => {
    setErrorMessage(error.message);
  };

  const onSubmit: SubmitHandler<IEmail> = async(data) => {
    mutate(data.email, {
      onError: handleError,
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <form
      className="flex flex-col gap-8 h-full w-full"
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

      {isError && <ErrorText errorText={errorMessage} />}
    </form>
  );
};

export default ChangeEmailForm;