'use client';

import { useNormalizedError } from "@/src/hooks/useNormalizedError";
import { trimObjectFields } from "@/src/lib/helpers";
import { useUpdateCollection } from "@/src/queries";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ErrorText, Heading4, Icons } from "@/src/components/atoms";
import { 
  SquareCheckboxInput, 
  PrimaryButton, 
  RoundedButton 
} from "@/src/components/molecules";
import { ICollection } from "@/src/services";
import { addCardToCollectionSchema } from "@/src/validation";
import { useMemo } from "react";

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

    collectionsWithoutCard.forEach(collection => {
      if (selectedCollectionIds.includes(collection.id)) {
        mutate({
          id: collection.id,
          name: collection.name,
          isPublic: collection.isPublic,
          cardIds: [...collection.cardDtos.map(c => c.id), cardId]
        }, {
          onError: handleError,
          onSuccess: closeModal,
        });
      }
    });
  };

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="w-full flex flex-col gap-8"
    >
      {!!collectionsWithoutCard.length && (
        <div className="flex flex-col gap-5 max-h-52 overflow-y-scroll">
          {collectionsWithoutCard.map(collection => (
            <div
              key={collection.id}
              className="flex w-full justify-between items-center"
            >
              <div className="flex gap-2 items-center">
                <Icons.folder className="w-6 h-6" />
                <Heading4 
                  text={collection.name} 
                  font="normal" 
                  classes="text-gray-80" 
                />
              </div>

              <SquareCheckboxInput
                value={collection.id}
                control={control}
                name="selectedCollectionIds"
              />
            </div>
          ))}  
        </div>
      )}
      
      <div className="w-full grid grid-cols-2 gap-5">
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
      
      {isError && <ErrorText errorText={errorMessage} />}
    </form>
  );
};

export default AddCardToCollectionForm;