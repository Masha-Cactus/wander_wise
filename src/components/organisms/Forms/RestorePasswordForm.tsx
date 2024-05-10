'use client';

import { useRestorePassword } from '@/src/queries';
import { IEmail } from '@/src/services';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { FormErrorText } from '../../atoms';
import { PrimaryBtn } from '../../moleculs';
import TextInput from '../../moleculs/Inputs/TextInput';

const validationSchema = yup
  .object({
    email: yup
      .string().trim().email().required('You must enter an email'),
  })
  .required();

const RestorePasswordForm = () => {
  const [errorMessage, setErrorMessage] = useState("");

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
      onSuccess: () => reset(),
    });
  };

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

      <PrimaryBtn text="Continue" onClick={() => {}} />

      {isError && <FormErrorText errorText={errorMessage} />}
    </form>
  );
};

export default RestorePasswordForm;