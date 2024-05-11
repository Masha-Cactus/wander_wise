"use client";

import { memo, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ISignUp } from "@/src/services";
import { signUpSchema } from "@/src/validation";
import {
  PrimaryBtn,
  TextInput,
} from "@/src/components/moleculs";
import { useSignUp } from "@/src/queries";
import { trimObjectFields } from "@/src/lib/helpers";
import FormErrorText from "../../atoms/FormErrorText";
import PasswordInput from "../../moleculs/Inputs/PasswordInput";
import { useNormalizedError } from "@/src/hooks/useNormalizedError";

const SignUpForm = () => {
  const [errorMessage, setErrorMessage] = useNormalizedError();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const validationSchema = signUpSchema();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUp>({
    values: {
      email: "",
      password: "",
      repeatPassword: "",
    },
    resolver: yupResolver(validationSchema),
    mode: 'onBlur',
  });

  const handleError = (error: any) => {
    setErrorMessage(error);
  };

  const { isPending, mutate, isError } = useSignUp();

  const onSubmit = async (data: ISignUp) => {
    const trimmedUserData = trimObjectFields(data);

    mutate(trimmedUserData, {
      onError: handleError,
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

      <PasswordInput
        name="password"
        label="Password"
        register={register}
        errorText={errors.password?.message}
        disabled={isPending}
        isShown={isShowPassword}
        onClick={() => setIsShowPassword(!isShowPassword)}
        placeholder="Enter your password"
      />

      <PasswordInput
        name="repeatPassword"
        label="Confirm password"
        register={register}
        errorText={errors.repeatPassword?.message}
        disabled={isPending}
        isShown={isShowPassword}
        onClick={() => setIsShowPassword(!isShowPassword)}
        placeholder="Confirm password"
      />

      {isError && <FormErrorText errorText={errorMessage} />}

      <PrimaryBtn text="Create account" classes="" onClick={() => {}} />
    </form>
  );
};

export default memo(SignUpForm);