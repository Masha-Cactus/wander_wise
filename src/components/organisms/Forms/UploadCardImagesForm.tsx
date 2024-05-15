'use client';

import { useNormalizedError } from "@/src/hooks";
import { useAddCardImages } from "@/src/queries";
import { uploadCardImagesSchema } from "@/src/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ErrorText } from "@/src/components/atoms";
import { ImageInput, PrimaryButton } from "@/src/components/moleculs";

type FormData = {
  images: File[],
};

type Props = {
  newCardId: number | null,
};

const UploadCardImagesForm: React.FC<Props> = ({ newCardId }) => {
  const { push } = useRouter();
  const [errorMessage, setErrorMessage] = useNormalizedError();
  
  const validationSchema = uploadCardImagesSchema();
    
  const {
    control,
    handleSubmit,
  } = useForm<FormData>({
    defaultValues: {
      images: [],
    },
    resolver: yupResolver(validationSchema),
  });

  const { isPending, mutate, isError } = useAddCardImages();

  const handleError = (error: any) => {
    setErrorMessage(error.message);
  };
  
  const onSubmit = async ({ images }: FormData) => {
    if (typeof newCardId === 'number') {
      mutate({
        images,
        id: newCardId,
      },
      {
        onError: handleError,
        onSuccess: () => push('/my-cards'),
      }
      );
    }
  };

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="w-full flex flex-col gap-6"
    >
      <ImageInput
        name="images"
        multiple={true}
        disabled={isPending}
        control={control}
      />
        
      <PrimaryButton text="Add" type="submit" />

      {isError && <ErrorText errorText={errorMessage} />}
    </form>
  );
};

export default UploadCardImagesForm;