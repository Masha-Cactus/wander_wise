import { memo, useEffect, useState } from "react";
import { ModalSkeleton } from "@/src/components/organisms";
import { ErrorText, Heading, Text } from "@/src/components/atoms";
import { ICard, ICollection, IUpdateCollection } from "@/src/services";
import { useGetUserCollections, useUpdateCollection } from "@/src/queries";
import { normalizeError } from "@/src/lib/helpers";
import {
  CheckboxInput,
  PrimaryButton,
  RoundedButton,
} from "@/src/components/moleculs";

interface AddCardToCollectionProps {
  onClose: () => void;
  card: ICard;
}

// todo
// need to test

const AddCardToCollection: React.FC<AddCardToCollectionProps> = ({
  onClose,
  card,
}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedCollections, setSelectedCollections] = useState<ICollection[]>(
    []
  );
  const {
    isError: isErrorGetCollections,
    data: collections,
    isPending: isPendingGetCollections,
    error: errorGetCollections,
  } = useGetUserCollections();

  const {
    isPending: isPendingUpdateCollection,
    mutate,
    isError: isErrorUpdateCollection,
  } = useUpdateCollection();

  const handleError = (error: any) => {
    setErrorMessage(normalizeError(error.message));
  };

  const handleClick = (collection: ICollection) => {
    if (selectedCollections.some((c) => c.id === collection.id)) {
      setSelectedCollections(
        selectedCollections.filter((c) => c.id !== collection.id)
      );
    } else {
      setSelectedCollections([...selectedCollections, collection]);
    }
  };

  const handleSubmit = () => {
    selectedCollections.forEach((collection) => {
      const data: IUpdateCollection = {
        ...collection,
        cardIds: collection.cards.map((c) => c.id),
      };

      mutate(data, { onError: handleError });
      onClose();
    });
  };

  useEffect(() => {
    if (errorGetCollections) {
      handleError(errorGetCollections);
    }
  }, [errorGetCollections]);

  const isError = isErrorGetCollections || isErrorUpdateCollection;
  const isPending = isPendingGetCollections || isPendingUpdateCollection;

  return (
    <ModalSkeleton onClose={onClose}>
      <Heading text={`Add “${card.name}” to a collection?`} />

      <div className="flex flex-col gap-4 h-2/3 scrollbar">
        {collections?.map((collection) => (
          <div
            key={collection.id}
            className="flex items-center justify-between"
          >
            <Text text={collection.name} />
            <CheckboxInput
              value={collection.id}
              onClick={() => handleClick(collection)}
              selected={collections.some((c) => c.id === collection.id)}
            />
          </div>
        ))}
      </div>

      <div className="flex w-full justify-between">
        <RoundedButton
          text="Cancel"
          onClick={onClose}
          classes="bg-red text-white"
          disabled={isPending}
        />
        <PrimaryButton
          text="Ass"
          type="submit"
          onClick={handleSubmit}
          classes="bg-white text-black border border-black"
        />
      </div>

      {isError && <ErrorText errorText={errorMessage} />}
    </ModalSkeleton>
  );
};

export default memo(AddCardToCollection);
