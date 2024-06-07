'use client';

import { useNormalizedError } from "@/src/hooks/useNormalizedError";
import { useUpdatePassword } from "@/src/queries";
import { IUpdatePassword } from "@/src/services";
import { changePasswordSchema } from "@/src/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { ErrorText } from "@/src/components/atoms";
import { PasswordInput, PrimaryButton } from "@/src/components/molecules";
import { useState } from "react";

type Props = {
  closeModal: () => void;
};

const ChangePasswordForm: React.FC<Props> = ({ closeModal }) => {
  const [errorMessage, setErrorMessage] = useNormalizedError();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const validationSchema = changePasswordSchema();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<IUpdatePassword, 'userId'>>({
    values: {
      oldPassword: "",
      password: "",
      repeatPassword: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const { isPending, mutate, isError } = useUpdatePassword();
  const handleError = (error: any) => {
    setErrorMessage(error.message);
  };

  const onSubmit: SubmitHandler<Omit<IUpdatePassword, 'userId'>> 
  = async(data) => {
    mutate(data, {
      onError: handleError,
      onSuccess: closeModal,
    });
  };

  return (
    <form
      className="grid grid-cols-2 gap-y-6 gap-x-4 h-full w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="col-span-1">
        <PasswordInput 
          name="oldPassword"
          label="Current password"
          control={control}
          errorText={errors.oldPassword?.message}
          disabled={isPending}
          isShown={isShowPassword}
          onClick={() => setIsShowPassword(!isShowPassword)}
        />
      </div>


      <div className="row-start-2">
        <PasswordInput 
          name="password"
          label="New password"
          control={control}
          errorText={errors.password?.message}
          disabled={isPending}
          isShown={isShowPassword}
          onClick={() => setIsShowPassword(!isShowPassword)}
        />
      </div>
      <div className="row-start-2">
        <PasswordInput 
          name="repeatPassword"
          label="Repeat new password"
          control={control}
          errorText={errors.repeatPassword?.message}
          disabled={isPending}
          isShown={isShowPassword}
          onClick={() => setIsShowPassword(!isShowPassword)}
        />
      </div>

      <PrimaryButton 
        text="Save" 
        disabled={isPending} 
        type='submit' 
        classes="row-start-3 col-span-2" 
      />

      {isError && <ErrorText errorText={errorMessage} />}
    </form>
  );
};

export default ChangePasswordForm;