"use client";

import { memo, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ISignIn } from "@/src/services";
import { signInSchema } from "@/src/validation";
import { PrimaryButton, TextInput } from "@/src/components/moleculs";
import { useSignIn } from "@/src/queries";
import { trimObjectFields } from "@/src/lib/helpers";
import FormErrorText from "../../atoms/FormErrorText";
import PasswordInput from "../../moleculs/Inputs/PasswordInput";
import { useRouter } from "next/navigation";

const SignInForm = () => {
  const [errorMassage, setErrorMassage] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const validationSchema = signInSchema();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignIn>({
    values: {
      email: "",
      password: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const handleError = (error: any) => {
    setErrorMassage(error.message);
  };

  const { isPending, mutate, isError } = useSignIn();
  const { push } = useRouter();

  const onSubmit = async (data: ISignIn) => {
    const trimmedUserData = trimObjectFields(data);

    mutate(trimmedUserData, {
      onError: handleError,
      onSuccess: () => push("/profile"),
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
        register={register}
        errorText={errors.email?.message}
        disabled={isPending}
      />

      <PasswordInput
        name="password"
        register={register}
        errorText={errors.password?.message}
        disabled={isPending}
        isShown={isShowPassword}
        onClick={() => setIsShowPassword(!isShowPassword)}
      />

      {isError && <FormErrorText errorText={errorMassage} />}

      <PrimaryButton
        text="Sign In"
        classes=""
        type="submit"
        disabled={isPending}
      />
    </form>
  );
};

export default memo(SignInForm);
