'use client';

import { useNormalizedError } from "@/src/hooks/useNormalizedError";
import { trimObjectFields } from "@/src/lib/helpers";
import { 
  useAddSocial, 
  useGetUserSocials, 
  useUpdateSocial 
} from "@/src/queries";
import { useUser } from "@/src/store/user";
import { socialLinkSchema } from "@/src/validation/socialLinkSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ErrorText } from "@/src/components/atoms";
import { TextInput, PrimaryButton } from "@/src/components/molecules";
import { SocialLinkName } from "@/src/services";

type Props = {
  name: SocialLinkName,
};

type FormData = {
  link: string;
};

const SocialLinkForm: React.FC<Props> = ({ name }) => {
  const { user } = useUser();
  const [errorMessage, setErrorMessage] = useNormalizedError();
  const { data: userSocials } = useGetUserSocials();
  const currentSocial = userSocials?.find(social => social.name === name);

  const validationSchema = socialLinkSchema();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
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

  const onSubmit = async (data: FormData) => {
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
      className="w-full flex flex-col gap-6"
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
          classes="h-10 w-1/4"
          disabled={isPending}
          type="submit"
        />
      </div>

      {isError && <ErrorText errorText={errorMessage} />}
    </form>
  );
};

export default SocialLinkForm;