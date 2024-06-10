'use client';

import { useNormalizedError } from "@/src/hooks";
import { useUpdateUserImage } from "@/src/queries";
import { uploadProfileImageSchema } from "@/src/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useWatch } from "react-hook-form";
import { ErrorText } from "@/src/components/atoms";
import { 
  ButtonFileInput, 
  PrimaryButton, 
  RoundedButton 
} from "@/src/components/molecules";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useUser } from "@/src/store/user";

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
  } = useForm<UploadProfileImageFormData>({
    defaultValues: {
      image: undefined,
    },
    resolver: yupResolver(validationSchema),
  });

  const uploadedImage = useWatch({control, name: 'image'});

  const { isPending, mutate, isError } = useUpdateUserImage();
  
  const onSubmit = async ({ image }: UploadProfileImageFormData) => {
    mutate(image,
      {
        onError: (e) => setErrorMessage(e),
        onSuccess: closeModal,
      }
    );
  };

  const deleteImage = () => {
    mutate(null, { 
      onError: (e) => setErrorMessage(e), 
      onSuccess: () => setImageUrl('/user-default.png') 
    });
  };

  const { user } = useUser();
  const [imageUrl, setImageUrl] = useState(
    user?.profileImage || '/user-default.png'
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
      className="w-full flex flex-col gap-6"
    >
      <div className="flex gap-8">
        <div className="flex flex-col gap-2">
          <div 
            className="relative w-[200px] h-[200px] 
            rounded-full overflow-hidden"
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

        <div className="flex flex-col gap-4 justify-center grow">
          <PrimaryButton 
            type="submit"
            text="Replace" 
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

      {isError && <ErrorText errorText={errorMessage} />}
    </form>
  );
};

export default UploadProfileImageForm;