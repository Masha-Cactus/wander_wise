'use client';

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useNormalizedError } from "@/src/hooks";
import { trimObjectFields } from "@/src/lib/helpers";
import { useCreateCollection, useGetUserSavedCards } from "@/src/queries";
import { ICreateCollection } from "@/src/services";
import { createCollectionSchema } from "@/src/validation";
import { Divider, ErrorText, Heading5 } from "@/src/components/atoms";
import { 
  PrimaryButton, 
  TextInput,
  CheckboxInput
} from "@/src/components/molecules";
import { Routes } from "@/src/lib/constants";


const CreateCollectionForm = () => {
  const { push } = useRouter();
  const [errorMessage, setErrorMessage] = useNormalizedError();
  const { data: savedCards } = useGetUserSavedCards();

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

  const onSubmit = async (data: Omit<ICreateCollection, "userId">) => {
    const trimmedData = trimObjectFields(data);

    mutate(trimmedData,
      {
        onError: (e) => setErrorMessage(e),
        onSuccess: () => push(Routes.COLLECTIONS.MAIN),
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-8"
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
        <div className="flex w-full flex-col gap-4">
          <Heading5 text="Choose cards to add" font="semibold" />
          <Divider />

          <div className="flex max-h-64 flex-col gap-4 overflow-y-scroll">
            {savedCards?.map(card => (
              <div 
                key={card.id} 
                className="flex items-center justify-between gap-4"
              >
                <Heading5 
                  text={`${card.name}, ${card.whereIs}`} 
                  font="normal"
                  classes="truncate"
                />
                <CheckboxInput
                  name="cardIds" 
                  control={control} 
                  value={card.id}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <PrimaryButton type="submit" text="Create" disabled={isPending} />

      {isError && <ErrorText errorText={errorMessage} />}
    </form>
  );
};

export default CreateCollectionForm;