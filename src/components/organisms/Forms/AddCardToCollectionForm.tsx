'use client';

import { useNormalizedError } from "@/src/hooks/useNormalizedError";
import { trimObjectFields } from "@/src/lib/helpers";
import { useUpdateCollection } from "@/src/queries";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ErrorText } from "@/src/components/atoms";
import { 
  SquareCheckboxInput, 
  PrimaryButton, 
  RoundedButton 
} from "@/src/components/moleculs";
import { ICollection } from "@/src/services";
import { addCardToCollectionSchema } from "@/src/validation";

type Props = {
  cardId: number,
  collections: ICollection[],
  closeModal: () => void;
};

type AddCardToCollectionFormData = {
  selectedCollectionIds: number[];
};

const AddCardToCollectionForm: React.FC<Props> 
= ({ cardId, collections, closeModal }) => {
  const [errorMessage, setErrorMessage] = useNormalizedError();

  const validationSchema = addCardToCollectionSchema();

  const {
    control,
    handleSubmit,
  } = useForm<AddCardToCollectionFormData>({
    values: {
      selectedCollectionIds: [],
    },
    resolver: yupResolver(validationSchema),
  });

  const handleError = (error: any) => {
    setErrorMessage(error.message);
  };

  const {
    isPending,
    mutate,
    isError,
  } = useUpdateCollection();

  const onSubmit = async (data: AddCardToCollectionFormData) => {
    const { selectedCollectionIds } = trimObjectFields(data);

    collections?.forEach(collection => {
      if (selectedCollectionIds.includes(collection.id)) {
        mutate({
          ...collection, 
          cardIds: [...collection.cardDtos.map(c => c.id), cardId]
        });
      }
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
      className="w-full flex flex-col gap-6"
    >
      <div className="flex flex-col gap-4 max-h-52 overflow-y-scroll">
        {collections.map(collection => (
          <SquareCheckboxInput
            key={collection.id}
            text={collection.name}
            value={collection.id}
            control={control}
            name="selectedCollectionIds"
          />
        ))}  
      </div>
      
      <div className="flex w-full gap-5 items-center">
        <RoundedButton
          text="Cancel"
          style="light"
          classes="grow"
          onClick={closeModal}
          disabled={isPending}
        />

        <PrimaryButton 
          type="submit"
          text="Add" 
          disabled={isPending} 
          classes="grow" 
        />
      </div>
      {isError && <ErrorText errorText={errorMessage} />}
    </form>
  );
};

export default AddCardToCollectionForm;