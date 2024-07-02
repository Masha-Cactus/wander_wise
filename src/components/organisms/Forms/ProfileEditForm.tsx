/* eslint-disable no-param-reassign */
"use client";

import { useEffect, useMemo } from "react";
import { RadarAutocompleteAddress } from "radar-sdk-js/dist/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { editProfileSchema } from "@/src/validation";
import { trimObjectFields } from "@/src/lib/helpers";
import { ErrorText } from "@/src/components/atoms";
import { useUpdateUserInfo } from "@/src/queries";
import { useUser } from "@/src/store/user";
import { useNormalizedError } from "@/src/hooks";
import { 
  PrimaryButton, 
  TextAreaInput, 
  LocationInput, 
  TextInput 
} from "@/src/components/molecules";

export interface ProfileEditFormData {
  pseudonym: string,
  firstName?: string,
  lastName?: string,
  location?: RadarAutocompleteAddress | null,
  bio?: string,
}

const ProfileEditForm = () => {
  const { user } = useUser();
  const [errorMessage, setErrorMessage] = useNormalizedError();
  const validationSchema = editProfileSchema();

  const defaultValues = useMemo(() => ({
    pseudonym: user?.pseudonym || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    location: null,
    bio: user?.bio || '',
  }), [user]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileEditFormData>({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const { isPending, mutate } = useUpdateUserInfo();

  const onSubmit: SubmitHandler<ProfileEditFormData> = (data) => {
    const { location, ...trimmedData } = trimObjectFields(data);

    mutate({
      ...trimmedData, 
      location: location 
        ? `${location.city}, ${location.country}` 
        : user?.location,
    }, {
      onError: (e) => setErrorMessage(e),
    }
    );
  };

  useEffect(() => {
    reset(defaultValues);
  }, [user, reset, defaultValues]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-6"
    >
      <TextInput
        type="text"
        name="pseudonym"
        control={control}
        errorText={errors.pseudonym?.message}
        disabled={isPending}
        placeholder={"Enter your username"}
        label="Username"
      />

      <div className="flex w-full gap-4">
        <div className="grow">
          <TextInput
            type="text"
            name="firstName"
            control={control}
            errorText={errors.firstName?.message}
            disabled={isPending}
            placeholder={"Enter your first name"}
            label="First name"
          />
        </div>
        <div className="grow">
          <TextInput
            type="text"
            name="lastName"
            control={control}
            errorText={errors.lastName?.message}
            disabled={isPending}
            placeholder={"Enter your last name"}
            label="Last name"
          />
        </div>
      </div>

      <LocationInput 
        placeholder={"City, country"}
        label="Location"
        name="location"
        control={control}
        disabled={isPending}
        defaultLocation={user?.location}
      />

      <TextAreaInput
        name="bio"
        control={control}
        errorText={errors.bio?.message}
        disabled={isPending}
        placeholder="Who are you?"
        label="Bio"
      />

      <PrimaryButton 
        type="submit" 
        text="Save changes" 
        disabled={isPending} 
      />

      {errorMessage && <ErrorText errorText={errorMessage} />}
    </form>
  );
};

export default ProfileEditForm;
