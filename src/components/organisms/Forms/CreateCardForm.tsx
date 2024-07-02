'use client';

import { Dispatch, SetStateAction } from "react";
import { RadarAutocompleteAddress } from "radar-sdk-js/dist/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNormalizedError } from "@/src/hooks";
import { trimObjectFields } from "@/src/lib/helpers";
import { useCreateCard } from "@/src/queries";
import { 
  ClimateType, 
  SpecialRequirementsType, 
  TripTypesType 
} from "@/src/services";
import { Divider, ErrorText, Heading5 } from "@/src/components/atoms";
import { 
  DropdownInput, 
  LocationInput, 
  ListInput, 
  TextAreaInput, 
  TextInput,
  RadioButtonInput,
  PrimaryButton,
  CheckboxInput
} from "@/src/components/molecules";
import { createCardSchema } from "@/src/validation";
import { ATMOSPHERES, CLIMATES, SPECIALS } from "@/src/lib/cardParameters";

interface CreateCardFormProps {
  setNewCardId: Dispatch<SetStateAction<number | null>>,
}

export interface CreateCardFormData {
  name: string,
  location: RadarAutocompleteAddress | null,
  tripTypes: TripTypesType[],
  climate: ClimateType,
  specialRequirements: SpecialRequirementsType[],
  description: string,
  whyThisPlace: string[],
  mapLink: string;
}

const CreateCardForm: React.FC<CreateCardFormProps> = ({ setNewCardId }) => {
  const [errorMessage, setErrorMessage] = useNormalizedError();
  
  const validationSchema = createCardSchema();
  
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCardFormData>({
    defaultValues: {
      name: "",
      location: null,
      tripTypes: [],
      climate: CLIMATES[0],
      specialRequirements: [],
      description: "",
      whyThisPlace: [],
      mapLink: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const { isPending, mutate } = useCreateCard();
  
  const onSubmit: SubmitHandler<CreateCardFormData> = (data) => {
    const {
      location,
      ...trimmedData
    } = trimObjectFields(data);

    mutate({
      ...trimmedData,
      populatedLocality: location?.city || '',
      country: location?.country || '',
    },
    {
      onError: (e) => setErrorMessage(e),
      onSuccess: ({id}) => setNewCardId(id),
    }
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-6"
    >
      <TextInput
        type="text"
        name="name"
        control={control}
        errorText={errors.name?.message}
        disabled={isPending}
        placeholder="Cool and awesome place"
        label="Name of the place"
      />

      <LocationInput 
        placeholder="City, region, country, continent"
        label="Location"
        name="location"
        control={control}
        disabled={isPending}
        errorText={errors.location?.message}
      />

      <TextInput
        type="text"
        name="mapLink"
        control={control}
        errorText={errors.mapLink?.message}
        disabled={isPending}
        placeholder="Enter a valid Google Maps link"
        label="Google Maps link"
      />

      <TextAreaInput
        name="description"
        control={control}
        errorText={errors.description?.message}
        disabled={isPending}
        placeholder="Write something about this place"
        label="Description"
      />

      <ListInput
        name="whyThisPlace"
        control={control}
        errorText={errors.whyThisPlace?.message}
        disabled={isPending}
        placeholder="Describe why"
        label="Why should people visit this place?"
      />

      <DropdownInput
        options={ATMOSPHERES}
        name="tripTypes"
        errorText={errors.tripTypes?.message}
        control={control}
        placeholder="Select the type of this place"
        label="Type of this place" 
      />

      <div className="grid grid-cols-2 gap-5">
        <div className="flex flex-col gap-4">
          <Heading5 text="Special" font="medium" />
          <Divider />
          <div className="flex flex-col gap-2">
            {SPECIALS.map((special) => (
              <CheckboxInput
                key={special}
                control={control}
                name="specialRequirements"
                value={special}
                text={special}
              />
            ))}

            {errors.specialRequirements?.message && (
              <ErrorText errorText={errors.specialRequirements.message} />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Heading5 text="Climate" font="medium" />
          <Divider />
          <div className="flex flex-col gap-2">
            {CLIMATES.map((climate) => (
              <RadioButtonInput
                key={climate}
                control={control}
                name="climate"
                value={climate}
                text={climate}
              />
            ))}

            {errors.climate?.message && (
              <ErrorText errorText={errors.climate.message} />
            )}
          </div>
        </div>
      </div>

      <PrimaryButton text="Create" type="submit" disabled={isPending} />

      {errorMessage && <ErrorText errorText={errorMessage} />}
    </form>
  );
};

export default CreateCardForm;