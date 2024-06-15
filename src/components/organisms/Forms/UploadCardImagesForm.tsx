'use client';

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useNormalizedError } from "@/src/hooks";
import { useAddCardImages } from "@/src/queries";
import { uploadCardImagesSchema } from "@/src/validation";
import { ErrorText } from "@/src/components/atoms";
import { MultipleImageInput, PrimaryButton } from "@/src/components/molecules";
import { Routes } from "@/src/lib/constants";

type UploadCardImagesFormData = {
  images: File[],
};

type Props = {
  cardId: number | null,
  closeModal?: () => void;
};

const UploadCardImagesForm: React.FC<Props> = ({ cardId, closeModal }) => {
  const { push } = useRouter();
  const [errorMessage, setErrorMessage] = useNormalizedError();
  
  const validationSchema = uploadCardImagesSchema();
    
  const {
    control,
    handleSubmit,
  } = useForm<UploadCardImagesFormData>({
    defaultValues: {
      images: [],
    },
    resolver: yupResolver(validationSchema),
  });

  const { isPending, mutate, isError } = useAddCardImages();
  
  const onSubmit = async ({images}: UploadCardImagesFormData) => {
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
      <MultipleImageInput
        name="images"
        disabled={isPending}
        control={control}
      />
        
      <PrimaryButton text="Add" type="submit" disabled={isPending} />

      {isError && <ErrorText errorText={errorMessage} />}
    </form>
  );
};

export default UploadCardImagesForm;