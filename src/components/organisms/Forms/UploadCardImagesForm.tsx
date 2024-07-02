'use client';

import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useNormalizedError } from "@/src/hooks";
import { useAddCardImages } from "@/src/queries";
import { uploadCardImagesSchema } from "@/src/validation";
import { ErrorText } from "@/src/components/atoms";
import { MultipleFileInput, PrimaryButton } from "@/src/components/molecules";
import { Routes } from "@/src/lib/constants";

interface UploadCardImagesFormProps {
  cardId: number | null,
  closeModal?: () => void;
}

interface UploadCardImagesFormData {
  images: File[],
}

const UploadCardImagesForm: React.FC<UploadCardImagesFormProps> 
= ({ cardId, closeModal }) => {
  const { push } = useRouter();
  const [errorMessage, setErrorMessage] = useNormalizedError();
  
  const validationSchema = uploadCardImagesSchema();
    
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<UploadCardImagesFormData>({
    defaultValues: {
      images: [],
    },
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const { isPending, mutate } = useAddCardImages();
  
  const onSubmit: SubmitHandler<UploadCardImagesFormData> = ({ images }) => {
    const formData = new FormData();

    if (images && images.length) {
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
      }
    }

    if (typeof cardId === 'number') {
      mutate({ images: formData, id: cardId },
        {
          onError: (e) => setErrorMessage(e),
          onSuccess: () => {
            if (closeModal) {
              closeModal();
            } else {
              push(Routes.TRIP(cardId));
            }
          },
        }
      );
    }
  };

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="flex w-full flex-col gap-6"
    >
      <MultipleFileInput
        name="images"
        disabled={isPending}
        control={control}
      />

      {errors.images?.message 
      && <ErrorText errorText={errors.images.message} />}
        
      <PrimaryButton text="Add" type="submit" disabled={isPending} />

      {errorMessage && <ErrorText errorText={errorMessage} />}
    </form>
  );
};

export default UploadCardImagesForm;