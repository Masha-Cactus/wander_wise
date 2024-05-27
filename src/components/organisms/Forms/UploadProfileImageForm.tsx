'use client';

import { useNormalizedError } from "@/src/hooks";
import { useUpdateUserImage } from "@/src/queries";
import { uploadProfileImageSchema } from "@/src/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ErrorText } from "@/src/components/atoms";
import { ImageInput, PrimaryButton } from "@/src/components/moleculs";

type UploadProfileImageFormData = {
  image: File,
};

type Props = {
  closeModal: () => void;
};

const UploadProfileImageForm: React.FC<Props> = ({ closeModal }) => {
  const [errorMessage, setErrorMessage] = useNormalizedError();
  
  const validationSchema = uploadProfileImageSchema();
    
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<UploadProfileImageFormData>({
    defaultValues: {
      image: undefined,
    },
    resolver: yupResolver(validationSchema),
  });

  const { isPending, mutate, isError } = useUpdateUserImage();

  const handleError = (error: any) => {
    setErrorMessage(error.message);
  };
  
  const onSubmit = async (data: UploadProfileImageFormData) => {
    mutate(data,
      {
        onError: handleError,
        onSuccess: () => closeModal(),
      }
    );
  };

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="w-full flex flex-col gap-6"
    >
      <ImageInput
        name="image"
        multiple={false}
        disabled={isPending}
        control={control}
      />

      {errors.image?.message && (
        <ErrorText errorText={errors.image.message} />
      )}
        
      <PrimaryButton 
        text="Add" 
        type="submit" 
        disabled={isPending} 
      />

      {isError && <ErrorText errorText={errorMessage} />}
    </form>
  );
};

export default UploadProfileImageForm;