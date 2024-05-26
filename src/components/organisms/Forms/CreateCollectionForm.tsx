'use client';

import { useNormalizedError, useGetSavedCards } from "@/src/hooks";
import { trimObjectFields } from "@/src/lib/helpers";
import { useCreateCollection } from "@/src/queries";
import { ICreateCollection } from "@/src/services";
import { createCollectionSchema } from "@/src/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Divider, ErrorText, Heading5 } from "@/src/components/atoms";
import { 
  PrimaryButton, 
  TextInput,
  SquareCheckboxInput
} from "@/src/components/moleculs";


const CreateCollectionForm = () => {
  const { push } = useRouter();
  const [errorMessage, setErrorMessage] = useNormalizedError();
  const savedCards = useGetSavedCards();

  const validationSchema = createCollectionSchema();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<ICreateCollection, 'userId'>>({
    values: {
      name: "",
      cardIds: [],
    },
    resolver: yupResolver(validationSchema),
  });

  const { isPending, mutate, isError } = useCreateCollection();

  const handleError = (error: any) => {
    setErrorMessage(error.message);
  };

  const onSubmit = async (data: Omit<ICreateCollection, "userId">) => {
    const trimmedData = trimObjectFields(data);

    mutate(trimmedData,
      {
        onError: handleError,
        onSuccess: () => push("/saved/collections"),
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-6"
    >
      <TextInput
        type="text"
        name="name"
        control={control}
        errorText={errors.name?.message}
        disabled={isPending}
        placeholder="My wished place to visit"
        label="Name of your collection"
      />

      {!!savedCards?.length && (
        <>
          <Heading5 text="Choose cards to add" font="semibold" />
          <Divider classes="w-full h-px" />

          <div className="flex flex-col max-h-64 overflow-y-scroll">
            {savedCards?.map(card => (
              <div key={card.id} className="flex justify-between items-center">
                <Heading5 
                  text={`${card.name}, ${card.whereIs}`} 
                  font="normal" 
                />
                <SquareCheckboxInput
                  text="" 
                  name="cardIds" 
                  control={control} 
                  value={card.id} 
                />
              </div>
            ))}
          </div>
        </>
      )}

      <PrimaryButton type="submit" text="Create" />

      {isError && <ErrorText errorText={errorMessage} />}
    </form>
  );
};

export default CreateCollectionForm;