import { memo, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ISignIn } from "@/app/services";
import { signInSchema } from "@/app/validation";
import {
  PasswordInput,
  PrimaryBtn,
  TextInput,
} from "@/app/components/moleculs/";
import { useSignIn } from "@/app/query";
import { trimObjectFields } from "@/app/lib/helpers";
import FormErrorText from "../../atoms/FormErrorText";

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

  const {
    isPending,
    mutate: signIn,
    isError,
  } = useSignIn({
    onError: handleError,
  });

  const onSubmit = (data: ISignIn) => {
    const trimmedUserData = trimObjectFields(data);

    signIn(trimmedUserData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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

      <PrimaryBtn text="Sign In" classes="" />
    </form>
  );
};

export default memo(SignInForm);
