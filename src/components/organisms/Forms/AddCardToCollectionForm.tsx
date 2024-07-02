'use client';

import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNormalizedError } from "@/src/hooks";
import { trimObjectFields } from "@/src/lib/helpers";
import { useUpdateCollection } from "@/src/queries";
import { ErrorText, Heading4, Icons } from "@/src/components/atoms";
import { 
  CheckboxInput, 
  PrimaryButton, 
  RoundedButton 
} from "@/src/components/molecules";
import { ICollection } from "@/src/services";
import { addCardToCollectionSchema } from "@/src/validation";

interface AddCardToCollectionFormProps {
  cardId: number,
  collections: ICollection[],
  closeModal: () => void;
}

interface AddCardToCollectionFormData {
  selectedCollectionIds: number[];
}

const AddCardToCollectionForm: React.FC<AddCardToCollectionFormProps> 
= ({ cardId, collections, closeModal }) => {
  const collectionsWithoutCard = useMemo(() => 
    collections.filter(c =>! c.cardDtos.find(card => card.id === cardId)), 
  [collections, cardId]);

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

  const { isPending, mutate } = useUpdateCollection();

  const onSubmit = (data: AddCardToCollectionFormData) => {
    const { selectedCollectionIds } = trimObjectFields(data);

    collectionsWithoutCard.forEach(collection => {
      if (selectedCollectionIds.includes(collection.id)) {
        mutate({
          id: collection.id,
          name: collection.name,
          isPublic: collection.isPublic,
          cardIds: [...collection.cardDtos.map(c => c.id), cardId]
        }, {
          onError: (e) => setErrorMessage(e),
          onSuccess: closeModal,
        });
      }
    });
  };

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="flex w-full flex-col gap-8"
    >
      {!!collectionsWithoutCard.length && (
        <div className="flex max-h-52 flex-col gap-5 overflow-y-scroll">
          {collectionsWithoutCard.map(collection => (
            <div
              key={collection.id}
              className="flex w-full items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <Icons.folder className="h-6 w-6" />
                <Heading4 
                  text={collection.name} 
                  font="normal" 
                  classes="text-gray-80" 
                />
              </div>

              <CheckboxInput
                value={collection.id}
                control={control}
                name="selectedCollectionIds"
              />
            </div>
          ))}  
        </div>
      )}
      
      <div className="grid w-full grid-cols-2 gap-5">
        <RoundedButton
          type="button"
          text="Cancel"
          style="light"
          onClick={closeModal}
          disabled={isPending}
        />

        <PrimaryButton 
          type="submit"
          text="Add" 
          disabled={isPending}
          classes="h-full" 
        />
      </div>

      {errorMessage && <ErrorText errorText={errorMessage} />}
    </form>
  );
};

export default AddCardToCollectionForm;