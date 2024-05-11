'use client';

import { useNormalizedError } from '@/src/hooks/useNormalizedError';
import { useRestorePassword } from '@/src/queries';
import { IEmail } from '@/src/services';
import { restorePasswordSchema } from '@/src/validation/restorePasswordSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormErrorText } from '../../atoms';
import { PrimaryBtn } from '../../moleculs';
import TextInput from '../../moleculs/Inputs/TextInput';

const RestorePasswordForm = () => {
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