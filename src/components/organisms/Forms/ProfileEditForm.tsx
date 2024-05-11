'use client';

import { memo, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IUpdateInfo } from "@/src/services";
import { editProfileSchema } from "@/src/validation";
import { trimObjectFields } from "@/src/lib/helpers";
import FormErrorText from "../../atoms/FormErrorText";
import { useUpdateUserInfo } from "@/src/queries";
import TextInput from "../../moleculs/Inputs/TextInput";
import { useRouter } from "next/navigation";
import { useUser } from "@/src/store/user";
import TextArea from "../../moleculs/Inputs/TextAreaInput";
import LocationInput from "../../moleculs/Inputs/LocationInput";

const ProfileEditForm = () => {
  const { user } = useUser();
  const [errorMessage, setErrorMessage] = useState("");
  const validationSchema = editProfileSchema();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Omit<IUpdateInfo, 'userId'>>({
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

  const onSubmit = async (data: Omit<IUpdateInfo, 'userId'>) => {
    const trimmedUserData = trimObjectFields(data);

    if (user) {
      mutate({...trimmedUserData, userId: user.id}, {
        onError: handleError,
        onSuccess: () => push('/profile'),
      });
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
        register={register}
        errorText={errors.pseudonym?.message}
        disabled={isPending}
        placeholder={user?.pseudonym}
        label="Username"
      />

      <div className="flex gap-4">
        <TextInput
          type="text"
          name="firstName"
          register={register}
          errorText={errors.firstName?.message}
          disabled={isPending}
          placeholder={user?.firstName}
          label="First name"
        />
        <TextInput
          type="text"
          name="lastName"
          register={register}
          errorText={errors.lastName?.message}
          disabled={isPending}
          placeholder={user?.lastName}
          label="Last name"
        />
      </div>

      <LocationInput 
        onChange={(value) => setValue('location', value)} 
      />

      {/* <TextInput
        type="text"
        name="location"
        register={register}
        errorText={errors.location?.message}
        disabled={isPending}
        placeholder={user?.location}
        label="Location"
      /> */}

      <TextArea
        name="bio"
        register={register}
        errorText={errors.bio?.message}
        disabled={isPending}
        placeholder="Who are you?"
        label="Bio"
      />

      {isError && <FormErrorText errorText={errorMessage} />}
    </form>
  );
};

export default memo(ProfileEditForm);