'use client';

import { useNormalizedError } from "@/src/hooks";
import { trimObjectFields } from "@/src/lib/helpers";
import { useCreateCollection } from "@/src/queries";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ErrorText } from "@/src/components/atoms";
import { 
  PrimaryButton, 
  TextInput,
} from "@/src/components/moleculs";
import { createCollectionShortSchema } from "@/src/validation";

type CreateCollectionShortData = {
  name: string;
};

type Props = {
  closeModal: () => void;
};

const CreateCollectionShortForm: React.FC<Props> = ({ closeModal }) => {
  const [errorMessage, setErrorMessage] = useNormalizedError();

  const validationSchema = createCollectionShortSchema();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCollectionShortData>({
    values: {
      name: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const { isPending, mutate, isError } = useCreateCollection();

  const handleError = (error: any) => {
    setErrorMessage(error.message);
  };

  const onSubmit = async (data: CreateCollectionShortData) => {
    const { name } = trimObjectFields(data);

    mutate({
      name,
      cardIds: [],
    },
    {
      onError: handleError,
      onSuccess: () => closeModal(),
    }
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-2"
    >
      <div className="flex gap-2">
        <TextInput
          type="text"
          name="name"
          control={control}
          errorText={errors.name?.message}
          disabled={isPending}
          placeholder="My wished place to visit"
          label="Name of your collection"
        />

        <PrimaryButton 
          type="submit" 
          text="Create" 
          disabled={isPending} 
        />
      </div>

      {isError && <ErrorText errorText={errorMessage} />}
    </form>
  );
};

export default CreateCollectionShortForm;