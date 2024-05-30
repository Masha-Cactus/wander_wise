"use client";

import { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ISignIn } from "@/src/services";
import { signInSchema } from "@/src/validation";
import { PrimaryButton, TextInput } from "@/src/components/moleculs";
import { useSignIn } from "@/src/queries";
import { trimObjectFields } from "@/src/lib/helpers";
import { ErrorText } from "@/src/components/atoms";
import { PasswordInput } from "@/src/components/moleculs";
import { useRouter } from "next/navigation";
import { useNormalizedError } from "@/src/hooks/useNormalizedError";
import { saveCookies } from "@/src/actions/manageCookies";
import { Routes } from "@/src/lib/constants";

type Props = {
  closeModal: () => void;
};

const SignInForm: React.FC<Props> = ({ closeModal }) => {
  const [errorMessage, setErrorMessage] = useNormalizedError();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const validationSchema = signInSchema();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignIn>({
    values: {
      email: "",
      password: "",
    },
    resolver: yupResolver(validationSchema),
    mode: 'onBlur'
  });

  const handleError = (error: any) => {
    setErrorMessage(error.message);
  };

  const { isPending, mutate, isError, isSuccess, data } = useSignIn();
  const { push } = useRouter();

  const onSubmit = async (data: ISignIn) => {
    const trimmedUserData = trimObjectFields(data);

    mutate(trimmedUserData, {
      onError: handleError,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      saveCookies({token: data.token, userId: data.user.id})
        .then(() => {
          closeModal();
          push(Routes.PROFILE.MAIN);
        });
    }
  }, [isSuccess]);

  return (
    <form
      className="flex flex-col gap-4 h-full w-full"
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

      <PasswordInput
        name="password"
        label="Password"
        placeholder="Enter your password"
        control={control}
        errorText={errors.password?.message}
        disabled={isPending}
        isShown={isShowPassword}
        onClick={() => setIsShowPassword(!isShowPassword)}
      />

      {isError && <ErrorText errorText={errorMessage} />}

      <PrimaryButton
        text="Login"
        classes=""
        type="submit"
        disabled={isPending}
      />
    </form>
  );
};

export default memo(SignInForm);
