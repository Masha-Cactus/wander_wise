'use client';

import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNormalizedError } from "@/src/hooks";
import { trimObjectFields } from "@/src/lib/helpers";
import { 
  useAddSocial, 
  useGetUserSocials, 
  useUpdateSocial 
} from "@/src/queries";
import { useUser } from "@/src/store/user";
import { socialLinkSchema } from "@/src/validation";
import { ErrorText } from "@/src/components/atoms";
import { TextInput, PrimaryButton } from "@/src/components/molecules";
import { SocialLinkName } from "@/src/services";

interface SocialLinkFormProps {
  name: SocialLinkName,
}

interface SocialLinkFormData {
  link: string;
}

const SocialLinkForm: React.FC<SocialLinkFormProps> = ({ name }) => {
  const { user } = useUser();
  const [errorMessage, setErrorMessage] = useNormalizedError();
  const { data: userSocials } = useGetUserSocials();
  const currentSocial = userSocials?.find(social => social.name === name);

  const validationSchema = socialLinkSchema();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SocialLinkFormData>({
    values: {
      link: currentSocial?.link || '',
    },
    resolver: yupResolver(validationSchema),
  });

  const { 
    isPending: isPendingAdd, 
    mutate: add, 
    isError: isAddError 
  } = useAddSocial();

  const { 
    isPending: isPendingUpdate, 
    mutate: update, 
    isError: isUpdateError 
  } = useUpdateSocial();

  const onSubmit: SubmitHandler<SocialLinkFormData> = (data) => {
    const { link } = trimObjectFields(data);
    
    if (user && currentSocial?.link !== link) {
      if (currentSocial) {
        update({ link, name, id: currentSocial.id, userId: user.id}, {
          onError: (e) => setErrorMessage(e),
        });
      } else {
        add({ link, name, userId: user.id}, {
          onError: (e) => setErrorMessage(e),
        });
      }
    }
  };

  const isPending = isPendingAdd || isPendingUpdate;
  const isError = isAddError || isUpdateError;

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="flex w-full flex-col gap-6"
    >
      <div className="flex items-end gap-3">
        <div className="grow">
          <TextInput
            type="text"
            name="link"
            control={control}
            errorText={errors.link?.message}
            disabled={isPending}
            label={name}
          />
        </div>
        <PrimaryButton 
          text={currentSocial ? "Update" : "Add"} 
          classes="h-12 w-1/4 rounded-md"
          disabled={isPending}
          type="submit"
        />
      </div>

      {isError && <ErrorText errorText={errorMessage} />}
    </form>
  );
};

export default SocialLinkForm;