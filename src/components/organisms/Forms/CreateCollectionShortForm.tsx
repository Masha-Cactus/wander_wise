'use client';

import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNormalizedError } from "@/src/hooks";
import { trimObjectFields } from "@/src/lib/helpers";
import { useCreateCollection } from "@/src/queries";
import { ErrorText } from "@/src/components/atoms";
import { 
  PrimaryButton, 
  TextInput,
} from "@/src/components/molecules";
import { createCollectionShortSchema } from "@/src/validation";

interface CreateCollectionShortFormProps {
  closeForm: () => void;
}

interface CreateCollectionShortData {
  name: string;
}

const CreateCollectionShortForm: React.FC<CreateCollectionShortFormProps> 
= ({ closeForm }) => {
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

  const { isPending, mutate } = useCreateCollection();

  const onSubmit: SubmitHandler<CreateCollectionShortData> = (data) => {
    const { name } = trimObjectFields(data);

    mutate({ name, cardIds: [] }, {
      onError: (e) => setErrorMessage(e),
      onSuccess: closeForm,
    }
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-2"
    >
      <div className="w-full">
        <TextInput
          type="text"
          name="name"
          control={control}
          errorText={errors.name?.message}
          disabled={isPending}
          placeholder="My wished place to visit"
        />
      </div>     

      <PrimaryButton 
        type="submit" 
        text="Create" 
        disabled={isPending} 
        classes="w-full h-10"
      />

      {errorMessage && <ErrorText errorText={errorMessage} />}
    </form>
  );
};

export default CreateCollectionShortForm;