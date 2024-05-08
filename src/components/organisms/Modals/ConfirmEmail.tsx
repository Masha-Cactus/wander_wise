'use client';

import { useConfirmEmail } from "@/src/queries/auth.queries";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import classNames from "classnames";
import { PrimaryBtn } from "@/src/components/moleculs/";

const formSchema = yup
  .object({
    confirmationCode: yup
      .string().trim().required('You must enter a confirmation code'),
  })
  .required();

interface FormData extends yup.InferType<typeof formSchema> {};

const ConfirmEmail = () => {
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

  const { mutateAsync } = useConfirmEmail();

  const onSubmit: SubmitHandler<FormData> = async(data) => {
    mutateAsync(data.confirmationCode)
      .then(() => reset());
  };

  return (
    <div
      className=" w-full h-full
        flex items-center justify-center flex-col
        self-center"
    >
      <form 
        className="flex flex-col gap-4 h-full w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="relative flex flex-col w-full">
          <label 
            className="text-black relative uppercase 
              flex flex-col w-full items-start">
            Confirmation code
            <input 
              {...register("confirmationCode")} 
              className={classNames('sign-input', {
                'sign-input-error': errors.confirmationCode,
              })}
            />
          </label>
          <p className="text-red-500 text-sm text-end">
            {errors.confirmationCode?.message}
          </p>
        </div>
        <PrimaryBtn text="Confirm" onClick={() => {}} />
      </form>
    </div>
  );
};

export default ConfirmEmail;