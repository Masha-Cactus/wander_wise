"use client";

import { Dispatch, memo, SetStateAction, useCallback, useEffect } from "react";
import { RadarAutocompleteAddress } from "radar-sdk-js/dist/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Divider,
  TextBase,
  TextSmall,
  ErrorText
} from "@/src/components/atoms";
import {
  RadioButtonInput,
  LocationInput,
  RoundedButton,
  ButtonCheckboxInput,
  CheckboxInput
} from "@/src/components/molecules";
import {
  ISearchCard,
  CardAuthorsType,
  TripTypesType,
  ClimateType,
  SpecialRequirementsType,
  TravelDistanceType,
} from "@/src/services";
import { searchCardsSchema } from "@/src/validation";
import { trimObjectFields } from "@/src/lib/helpers";
import { 
  ATMOSPHERES, 
  AUTHORS, 
  CLIMATES, 
  DISTANCE, 
  SPECIALS 
} from "@/src/lib/cardParameters";

type Props = {
  setFilterParams: Dispatch<SetStateAction<ISearchCard | null>>;
};

export interface FilterFormData {
  author: CardAuthorsType[],
  startLocation: RadarAutocompleteAddress | null,
  tripTypes: TripTypesType[],
  climate: ClimateType[],
  specialRequirements: SpecialRequirementsType[],
  travelDistance: TravelDistanceType,
}

const SearchCardsForm: React.FC<Props> = ({ setFilterParams }) => {
  const validationSchema = searchCardsSchema();
  const {
    handleSubmit,
    formState: { errors, isDirty },
    control,
    reset,
  } = useForm<FilterFormData>({
    defaultValues: {
      author: [],
      startLocation: null,
      tripTypes: [],
      climate: [],
      specialRequirements: [],
      travelDistance: undefined,
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<FilterFormData> = (data) => {
    const {
      startLocation, 
      travelDistance, 
      ...trimmedData
    } = trimObjectFields(data);

    setFilterParams({
      ...trimmedData,
      travelDistance: [ travelDistance ],
      startLocation: `${startLocation?.city}, ${startLocation?.country}`,
    });
  };

  const onClear = useCallback(() => {
    reset();
    setFilterParams(null);
  }, [reset, setFilterParams]);

  useEffect(() => {
    if (!isDirty) {
      setFilterParams(null);
    }
  }, [isDirty, setFilterParams]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-8
      border-r border-gray-30 bg-white pt-8"
    >
      <div className="mx-10 flex flex-col">
        <TextBase text="Where are you now?*" font="semibold" />
        <TextSmall
          text="We need this info to build distance of your trip"
          font="normal"
          classes="mt-2"
        />
        <LocationInput 
          placeholder="Enter your place"
          name="startLocation"
          control={control}
          errorText={errors.startLocation?.message}
        />
      </div>

      <Divider />

      <div className="mx-10 flex flex-col">
        <TextBase
          text="What is your preferred travel distance?*"
          font="semibold"
        />
        <TextSmall
          text="We need this info to figure out the scale of your trip"
          font="normal"
          classes="mt-2"
        />
        <div className="mt-3 flex flex-wrap gap-3">
          {DISTANCE.map(([distanceText, distanceValue]) => (
            <RadioButtonInput
              key={distanceValue}
              name="travelDistance"
              control={control}
              text={distanceText}
              value={distanceValue}
            />
          ))}

          {errors.travelDistance?.message && (
            <ErrorText errorText={errors.travelDistance.message} />
          )}
        </div>
      </div>

      <Divider />

      <div className="mx-10 flex flex-col">
        <TextBase text="Type of your trip" font="semibold" />
        <div className="mt-3 flex flex-wrap gap-2">
          {ATMOSPHERES.map((atmosphere) => (
            <ButtonCheckboxInput
              key={atmosphere}
              control={control}
              name="tripTypes"
              value={atmosphere}
            />
          ))}
        </div>
      </div>

      <Divider />

      <div className="mx-10 flex flex-col">
        <TextBase text="Desired climate" font="semibold" />
        <div className="mt-3 flex flex-wrap gap-2">
          {CLIMATES.map((climate) => (
            <ButtonCheckboxInput
              key={climate}
              control={control}
              name="climate"
              value={climate}
            />
          ))}
        </div>
      </div>

      <Divider />

      <div className="mx-10 flex flex-col">
        <TextBase text="Special requirements" font="semibold" />
        <div className="mt-3 flex flex-wrap gap-2">
          {SPECIALS.map((special) => (
            <ButtonCheckboxInput
              key={special}
              control={control}
              name="specialRequirements"
              value={special}
            />
          ))}
        </div>
      </div>

      <Divider />

      <div className="mx-10 flex flex-col">
        <TextBase text="Cards author" font="semibold" />
        <div className="mt-3 flex flex-wrap gap-2">
          {AUTHORS.map(([authorText, authorValue]) => (
            <CheckboxInput
              key={authorValue}
              name="author"
              control={control}
              text={authorText}
              value={authorValue}
            />
          ))}
        </div>
      </div>

      <div 
        className="flex items-center
        justify-center gap-4 px-10 py-6"
      >
        <RoundedButton
          text="Apply"
          type="submit"
          style="dark"
        />
        <RoundedButton
          text="Clear"
          type="button"
          style="light"
          onClick={onClear}
          disabled={!isDirty}
        />
      </div>
    </form>
  );
};

export default memo(SearchCardsForm);
