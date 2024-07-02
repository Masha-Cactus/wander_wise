"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ISignUp } from "@/src/services";
import { signUpSchema } from "@/src/validation";
import {
  PrimaryButton,
  TextInput,
} from "@/src/components/molecules";
import { useSignUp } from "@/src/queries";
import { trimObjectFields } from "@/src/lib/helpers";
import { ErrorText } from "@/src/components/atoms";
import { PasswordInput } from "@/src/components/molecules";
import { useNormalizedError } from "@/src/hooks";

interface SignUpFormProps {
  openConfirmEmailModal: () => void;
  openSignInModal: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> 
= ({ openConfirmEmailModal, openSignInModal }) => {
  const [errorMessage, setErrorMessage] = useNormalizedError();
  const validationSchema = signUpSchema();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUp>({
    values: {
      email: "",
      password: "",
      repeatPassword: "",
    },
    resolver: yupResolver(validationSchema),
  });
  
  const { isPending, mutate } = useSignUp();

  const onSubmit: SubmitHandler<ISignUp> = (data) => {
    const trimmedUserData = trimObjectFields(data);

    mutate(trimmedUserData, {
      onError: (e) => setErrorMessage(e),
      onSuccess: (user) => {
        user.banned 
          ? openConfirmEmailModal()
          : openSignInModal();
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

      <PasswordInput
        name="password"
        label="Password"
        control={control}
        errorText={errors.password?.message}
        disabled={isPending}
        placeholder="Enter your password"
      />

      <PasswordInput
        name="repeatPassword"
        label="Confirm password"
        control={control}
        errorText={errors.repeatPassword?.message}
        disabled={isPending}
        placeholder="Confirm password"
      />

      <PrimaryButton
        text="Create Account"
        classes=""
        type="submit"
        disabled={isPending}
      />

      {errorMessage && <ErrorText errorText={errorMessage} />}
    </form>
  );
};

export default SignUpForm;