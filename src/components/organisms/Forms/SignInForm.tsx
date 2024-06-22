"use client";

import { memo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { ISignIn } from "@/src/services";
import { signInSchema } from "@/src/validation";
import { PrimaryButton, TextInput, UnstyledButton } from "@/src/components/molecules";
import { useSignIn } from "@/src/queries";
import { trimObjectFields } from "@/src/lib/helpers";
import { ErrorText } from "@/src/components/atoms";
import { PasswordInput } from "@/src/components/molecules";
import { useNormalizedError } from "@/src/hooks";
import { Routes } from "@/src/lib/constants";

interface SignInFormProps {
  closeModal: () => void;
  openRestorePasswordModal: () => void;
}

const SignInForm: React.FC<SignInFormProps> 
= ({ closeModal, openRestorePasswordModal }) => {
  const [errorMessage, setErrorMessage] = useNormalizedError();
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

  const { isPending, mutate, isError } = useSignIn();
  const { push } = useRouter();

  const onSubmit: SubmitHandler<ISignIn> = (data) => {
    const trimmedUserData = trimObjectFields(data);

    mutate(trimmedUserData, {
      onError: (e) => setErrorMessage(e),
      onSuccess: () => {
        closeModal();
        push(Routes.PROFILE.MAIN);
      }
    });
  };

  return (
    <form
      className="flex h-full w-full flex-col gap-4"
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

      <div className="flex w-full flex-col gap-3">
        <PasswordInput
          name="password"
          label="Password"
          placeholder="Enter your password"
          control={control}
          errorText={errors.password?.message}
          disabled={isPending}
        />
        <UnstyledButton
          text="Forgot password?"
          classes="font-bold self-start"
          onClick={openRestorePasswordModal}
        />
      </div>

      {isError && <ErrorText errorText={errorMessage} />}

      <PrimaryButton
        text="Login"
        type="submit"
        disabled={isPending}
      />
    </form>
  );
};

export default memo(SignInForm);
