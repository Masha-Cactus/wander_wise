'use client';

import { useNormalizedError } from "@/src/hooks/useNormalizedError";
import { trimObjectFields } from "@/src/lib/helpers";
import { useAddSocial } from "@/src/queries";
import { useUser } from "@/src/store/user";
import { socialLinkSchema } from "@/src/validation/socialLinkSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { FormErrorText } from "@/src/components/atoms";
import { TextInput, PrimaryButton } from "@/src/components/moleculs";

type Props = {
  name: string,
};

type FormData = {
  link: string;
};

const SocialLinkForm: React.FC<Props> = ({ name }) => {
  const { user } = useUser();
  const [errorMessage, setErrorMessage] = useNormalizedError();

  const validationSchema = socialLinkSchema();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    values: {
      link: '',
    },
    resolver: yupResolver(validationSchema),
  });

  const handleError = (error: any) => {
    setErrorMessage(error.message);
  };

  const { isPending, mutate, isError } = useAddSocial();

  const onSubmit = async (data: FormData) => {
    const trimmedUserData = trimObjectFields(data);
    
    if (user) {
      mutate({...trimmedUserData, name, userId: user.id}, {
        onError: handleError,
      });
    }
  };

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="w-full flex flex-col gap-6"
    >
      <div className="flex items-end gap-3">
        <TextInput
          type="text"
          name="link"
          register={register}
          errorText={errors.link?.message}
          disabled={isPending}
          label={name}
        />
        <PrimaryButton text="Add" classes="h-10 w-1/3" />
      </div>

      {isError && <FormErrorText errorText={errorMessage} />}
    </form>
  );
};

export default SocialLinkForm;