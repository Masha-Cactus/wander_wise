'use client';

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "next/navigation";
import { useNormalizedError } from "@/src/hooks";
import { trimObjectFields } from "@/src/lib/helpers";
import { useGetCollection, useUpdateCollection } from "@/src/queries";
import { useUser } from "@/src/store/user";
import { ErrorText } from "@/src/components/atoms";
import { TextInput, PrimaryButton } from "@/src/components/molecules";
import { changeCollectionNameSchema } from "@/src/validation";

interface ChangeCollectionNameFormProps {
  closeModal: () => void,
}

interface ChangeCollectionNameFormData {
  newName: string;
}

const ChangeCollectionNameForm: React.FC<ChangeCollectionNameFormProps> 
= ({ closeModal }) => {
  const { user } = useUser();
  const [errorMessage, setErrorMessage] = useNormalizedError();
  const { id: collectionId } = useParams();
  const { data: collection } = useGetCollection(+collectionId);

  const validationSchema = changeCollectionNameSchema();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangeCollectionNameFormData>({
    defaultValues: {
      newName: collection?.name,
    },
    resolver: yupResolver(validationSchema),
  });

  const { isPending, mutate } = useUpdateCollection();

  const onSubmit = (data: ChangeCollectionNameFormData) => {
    const { newName } = trimObjectFields(data);
    
    if (user && collection) {
      mutate({
        name: newName, 
        cardIds: collection.cardDtos.map(card => card.id),
        id: collection.id,
        isPublic: collection.isPublic,
      }, {
        onError: (e) => setErrorMessage(e),
        onSuccess: closeModal,
      });
    }
  };

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="flex w-full flex-col gap-8"
    >
      <TextInput
        type="text"
        name="newName"
        control={control}
        errorText={errors.newName?.message}
        disabled={isPending}
        label="New collection name"
      />

      <PrimaryButton 
        text="Change" 
        type="submit" 
        classes="w-full" 
        disabled={isPending} 
      />

      {errorMessage && <ErrorText errorText={errorMessage} />}
    </form>
  );
};

export default ChangeCollectionNameForm;