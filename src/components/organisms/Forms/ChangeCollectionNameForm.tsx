'use client';

import { useNormalizedError } from "@/src/hooks/useNormalizedError";
import { trimObjectFields } from "@/src/lib/helpers";
import { useUpdateCollection } from "@/src/queries";
import { useUser } from "@/src/store/user";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ErrorText } from "@/src/components/atoms";
import { TextInput, PrimaryButton } from "@/src/components/moleculs";
import { ICollection } from "@/src/services";
import { changeCollectionNameSchema } from "@/src/validation";

type Props = {
  collection: ICollection,
  hideForm: () => void,
};

type FormData = {
  newName: string;
};

const ChangeCollectionNameForm: React.FC<Props> 
= ({ collection, hideForm }) => {
  const { user } = useUser();
  const [errorMessage, setErrorMessage] = useNormalizedError();

  const validationSchema = changeCollectionNameSchema();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      newName: collection.name,
    },
    resolver: yupResolver(validationSchema),
  });

  const handleError = (error: any) => {
    setErrorMessage(error.message);
  };

  const { isPending, mutate, isError } = useUpdateCollection();

  const onSubmit = async (data: FormData) => {
    const { newName } = trimObjectFields(data);
    
    if (user) {
      mutate({
        name: newName, 
        cardIds: collection.cardDtos.map(card => card.id),
        id: collection.id,
        isPublic: collection.isPublic,
      }, {
        onError: handleError,
        onSuccess: () => hideForm(),
      });
    }
  };

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="w-full flex flex-col gap-6"
    >
      <div className="flex items-end gap-3">
        <div className="grow">
          <TextInput
            type="text"
            name="newName"
            control={control}
            errorText={errors.newName?.message}
            disabled={isPending}
          />
        </div>
        <PrimaryButton text="Change" classes="h-10 w-1/4" />
      </div>

      {isError && <ErrorText errorText={errorMessage} />}
    </form>
  );
};

export default ChangeCollectionNameForm;