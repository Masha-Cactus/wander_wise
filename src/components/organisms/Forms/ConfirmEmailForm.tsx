'use client';

import { useConfirmEmail } from "@/src/queries/auth.queries";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { PrimaryButton } from "@/src/components/moleculs/";
import { useState } from "react";
import { FormErrorText } from "../../atoms";
import TextInput from "../../moleculs/Inputs/TextInput";

const formSchema = yup
  .object({
    confirmationCode: yup
      .string().trim().required('You must enter a confirmation code'),
  })
  .required();

interface FormData extends yup.InferType<typeof formSchema> {};

const ConfirmEmailForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { 
    register, 
    handleSubmit,
    formState: { errors }, 
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(formSchema),
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
      onSuccess: () => reset(),
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
      <PrimaryButton text="Confirm" onClick={() => {}} />
      {isError && <FormErrorText errorText={errorMessage} />}
    </form>
  );
};

export default ConfirmEmailForm;