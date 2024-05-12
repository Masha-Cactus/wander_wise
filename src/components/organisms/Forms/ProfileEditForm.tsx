"use client";

import { memo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IUpdateInfo } from "@/src/services";
import { editProfileSchema } from "@/src/validation";
import { trimObjectFields } from "@/src/lib/helpers";
import { ErrorText } from "@/src/components/atoms";
import { useUpdateUserInfo } from "@/src/queries";
import { useRouter } from "next/navigation";
import { useUser } from "@/src/store/user";
import { useNormalizedError } from "@/src/hooks/useNormalizedError";
import {
  TextAreaInput,
  TextInput,
  LocationInput,
} from "@/src/components/moleculs";

const ProfileEditForm = () => {
  const { user } = useUser();
  const [errorMessage, setErrorMessage] = useNormalizedError();
  const validationSchema = editProfileSchema();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Omit<IUpdateInfo, "userId">>({
    values: {
      pseudonym: "",
      firstName: "",
      lastName: "",
      location: "",
      bio: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const handleError = (error: any) => {
    setErrorMessage(error.message);
  };

  const { isPending, mutate, isError } = useUpdateUserInfo();
  const { push } = useRouter();

  const onSubmit = async (data: Omit<IUpdateInfo, "userId">) => {
    const trimmedUserData = trimObjectFields(data);

    if (user) {
      mutate(
        { ...trimmedUserData, userId: user.id },
        {
          onError: handleError,
          onSuccess: () => push("/profile"),
        }
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-6"
    >
      <TextInput
        type="text"
        name="pseudonym"
        control={control}
        errorText={errors.pseudonym?.message}
        disabled={isPending}
        placeholder={user?.pseudonym}
        label="Username"
      />

      <div className="flex gap-4">
        <TextInput
          type="text"
          name="firstName"
          control={control}
          errorText={errors.firstName?.message}
          disabled={isPending}
          placeholder={user?.firstName || "Enter your first name"}
          label="First name"
        />
        <TextInput
          type="text"
          name="lastName"
          control={control}
          errorText={errors.lastName?.message}
          disabled={isPending}
          placeholder={user?.lastName || "Enter your last name"}
          label="Last name"
        />
      </div>

      <LocationInput onChange={(value) => setValue("location", value)} />

      <TextAreaInput
        name="bio"
        control={control}
        errorText={errors.bio?.message}
        disabled={isPending}
        placeholder="Who are you?"
        label="Bio"
      />

      {isError && <ErrorText errorText={errorMessage} />}
    </form>
  );
};

export default memo(ProfileEditForm);
