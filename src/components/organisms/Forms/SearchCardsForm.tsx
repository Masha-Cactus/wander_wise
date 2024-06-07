"use client";

import {
  Divider,
  TextBase,
  TextSmall,
  ErrorText
} from "@/src/components/atoms";
import {
  CheckboxInput,
  LocationInput,
  RoundedButton,
  FilterButton,
  SquareCheckboxInput
} from "@/src/components/molecules";
import {
  ISearchCard,
  CardAuthorsType,
  TripTypesType,
  ClimateType,
  SpecialRequirementsType,
  TravelDistanceType,
} from "@/src/services";
import { useForm } from "react-hook-form";
import { searchCardsSchema } from "@/src/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { trimObjectFields } from "@/src/lib/helpers";
import { Dispatch, SetStateAction } from "react";
import { RadarAutocompleteAddress } from "radar-sdk-js/dist/types";
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
  travelDistance: TravelDistanceType[],
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
      travelDistance: [],
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: FilterFormData) => {
    const {startLocation, ...trimmedData} = trimObjectFields(data);

    setFilterParams({
      ...trimmedData,
      startLocation: `${startLocation?.city}, ${startLocation?.country}`,
    });
  };

  const onClear = () => {
    reset();
    setFilterParams(null);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col pt-8
      bg-white border border-gray-30 gap-8"
    >
      <div className="flex flex-col mx-10">
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

      <div className="flex flex-col mx-10">
        <TextBase
          text="What is your preferred travel distance?*"
          font="semibold"
        />
        <TextSmall
          text="We need this info to figure out the scale of your trip"
          font="normal"
          classes="mt-2"
        />
        <div className="flex flex-wrap gap-3 mt-3">
          {DISTANCE.map(([distanceText, distanceValue]) => (
            <CheckboxInput
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

      <div className="flex flex-col mx-10">
        <TextBase text="Type of your trip" font="semibold" />
        <div className="flex flex-wrap gap-2 mt-3">
          {ATMOSPHERES.map((atmosphere) => (
            <FilterButton
              key={atmosphere}
              control={control}
              name="tripTypes"
              value={atmosphere}
            />
          ))}
        </div>
      </div>

      <Divider />

      <div className="flex flex-col mx-10">
        <TextBase text="Desired climate" font="semibold" />
        <div className="flex flex-wrap gap-2 mt-3">
          {CLIMATES.map((climate) => (
            <FilterButton
              key={climate}
              control={control}
              name="climate"
              value={climate}
            />
          ))}
        </div>
      </div>

      <Divider />

      <div className="flex flex-col mx-10">
        <TextBase text="Special requirements" font="semibold" />
        <div className="flex flex-wrap gap-2 mt-3">
          {SPECIALS.map((special) => (
            <FilterButton
              key={special}
              control={control}
              name="specialRequirements"
              value={special}
            />
          ))}
        </div>
      </div>

      <Divider />

      <div className="flex flex-col mx-10">
        <TextBase text="Cards author" font="semibold" />
        <div className="flex flex-wrap gap-2 mt-3">
          {AUTHORS.map(([authorText, authorValue]) => (
            <SquareCheckboxInput
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
        className="px-10 py-6
        flex gap-4 items-center justify-center"
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

export default SearchCardsForm;
