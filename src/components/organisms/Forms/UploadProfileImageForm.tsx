'use client';

import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useNormalizedError } from "@/src/hooks";
import { useUpdateUserImage } from "@/src/queries";
import { uploadProfileImageSchema } from "@/src/validation";
import { ErrorText } from "@/src/components/atoms";
import { 
  ButtonFileInput, 
  PrimaryButton, 
  RoundedButton 
} from "@/src/components/molecules";
import { useUser } from "@/src/store/user";

interface UploadProfileImageFormProps {
  closeModal: () => void;
}

interface UploadProfileImageFormData {
  image: File,
}

const UploadProfileImageForm: React.FC<UploadProfileImageFormProps> 
= ({ closeModal }) => {
  const [errorMessage, setErrorMessage] = useNormalizedError();
  
  const validationSchema = uploadProfileImageSchema();
    
  const {
    control,
    handleSubmit,
  } = useForm<UploadProfileImageFormData>({
    defaultValues: {
      image: undefined,
    },
    resolver: yupResolver(validationSchema),
  });

  const uploadedImage = useWatch({control, name: 'image'});

  const { isPending, mutate } = useUpdateUserImage();
  
  const onSubmit: SubmitHandler<UploadProfileImageFormData> = ({ image }) => {
    mutate(image,
      {
        onError: (e) => setErrorMessage(e),
        onSuccess: closeModal,
      }
    );
  };

  const deleteImage = useCallback(() => {
    mutate(null, { 
      onError: (e) => setErrorMessage(e), 
      onSuccess: () => setImageUrl('/user-default.webp') 
    });
  }, []);

  const { user } = useUser();
  const [imageUrl, setImageUrl] = useState(
    user?.profileImage || '/user-default.webp'
  );

  useEffect(() => {
    if (uploadedImage) {
      const url = URL.createObjectURL(uploadedImage);

      setImageUrl(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [uploadedImage]);

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="flex w-full flex-col gap-6"
    >
      <div className="flex gap-8">
        <div className="flex flex-col gap-2">
          <div 
            className="relative h-[200px] w-[200px] 
            overflow-hidden rounded-full"
          >
            <Image 
              src={imageUrl} 
              alt="Uploaded image"
              fill
              sizes="200px"
              className="object-cover" 
            />
          </div>

          <ButtonFileInput
            name="image"
            disabled={isPending}
            control={control}
          />
        </div>

        <div className="flex grow flex-col justify-center gap-4">
          <PrimaryButton 
            type="submit"
            text={user?.profileImage ? "Replace" : "Add"} 
            disabled={isPending || !uploadedImage}
          />

          <RoundedButton
            type="button"
            text="Delete"
            style="red"
            onClick={deleteImage}
            disabled={isPending || !user?.profileImage}
          />

          <RoundedButton
            type="button"
            text="Cancel"
            style="light"
            onClick={closeModal}
            disabled={isPending}
          />  
        </div>
      </div>

      {errorMessage && <ErrorText errorText={errorMessage} />}
    </form>
  );
};

export default UploadProfileImageForm;