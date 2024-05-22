"use client";

import {
  Divider,
  TextBase,
  TextSmall,
} from "@/src/components/atoms";
import {
  CheckboxInput,
  LocationInput,
  RoundedButton,
  FilterButton,
  SquareCheckboxInput
} from "@/src/components/moleculs";
import {
  CardAuthors,
  Climate,
  SpecialRequirements,
  TravelDistance,
  TripTypes,
  ISearchCard,
  CardAuthorsType,
  TripTypesType,
  ClimateType,
  SpecialRequirementsType,
  TravelDistanceType,
} from "@/src/services";
import { useForm, useWatch } from "react-hook-form";
import { searchCardsSchema } from "@/src/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { trimObjectFields } from "@/src/lib/helpers";
import { Dispatch, SetStateAction } from "react";
import { RadarAutocompleteAddress } from "radar-sdk-js/dist/types";

const atmospheres = Object.values(TripTypes);
const climates = Object.values(Climate);
const specials = Object.values(SpecialRequirements);
const authors = Object.entries(CardAuthors);
const distance = Object.entries(TravelDistance);

type Props = {
  setFilterParams: Dispatch<SetStateAction<ISearchCard | null>>;
};

export interface FilterFormData {
  author: CardAuthorsType[],
  startLocation: RadarAutocompleteAddress,
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
      startLocation: {},
      tripTypes: [],
      climate: [],
      specialRequirements: [],
      travelDistance: [],
    },
    resolver: yupResolver(validationSchema),
  });

  const location = useWatch({
    control,
    name: 'startLocation',
  });

  const onSubmit = async (data: FilterFormData) => {
    const {startLocation, ...trimmedData} = trimObjectFields(data);

    setFilterParams({
      ...trimmedData, 
      startLocation: `${startLocation.city}, ${startLocation.country}`,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col
      bg-white border-2 border-gray-30 gap-8"
    >
      <div className="flex flex-col mt-8 mx-10">
        <TextBase text="Where are you now?" font="semibold" />
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

      <Divider classes="h-px w-full" />

      <div className="flex flex-col mx-10">
        <TextBase
          text="What is your preferred travel distance?"
          font="semibold"
        />
        <TextSmall
          text="We need this info to figure out the scale of your trip"
          font="normal"
          classes="mt-2"
        />
        <div className="flex flex-wrap gap-3 mt-3">
          {distance.map(([distanceText, distanceValue]) => (
            <CheckboxInput
              key={distanceValue}
              name="travelDistance"
              control={control}
              text={distanceText}
              value={distanceValue}
            />
          ))}
        </div>
      </div>

      <Divider classes="h-px w-full" />

      <div className="flex flex-col mx-10">
        <TextBase text="Type of your trip" font="semibold" />
        <div className="flex flex-wrap gap-2 mt-3">
          {atmospheres.map((atmosphere) => (
            <FilterButton
              key={atmosphere}
              control={control}
              name="tripTypes"
              value={atmosphere}
            />
          ))}
        </div>
      </div>

      <Divider classes="h-px w-full" />

      <div className="flex flex-col mx-10">
        <TextBase text="Desired climate" font="semibold" />
        <div className="flex flex-wrap gap-2 mt-3">
          {climates.map((climate) => (
            <FilterButton
              key={climate}
              control={control}
              name="climate"
              value={climate}
            />
          ))}
        </div>
      </div>

      <Divider classes="h-px w-full" />

      <div className="flex flex-col mx-10">
        <TextBase text="Special requirements" font="semibold" />
        <div className="flex flex-wrap gap-2 mt-3">
          {specials.map((special) => (
            <FilterButton
              key={special}
              control={control}
              name="specialRequirements"
              value={special}
            />
          ))}
        </div>
      </div>

      <Divider classes="h-px w-full" />

      <div className="flex flex-col mx-10">
        <TextBase text="Cards author" font="semibold" />
        <div className="flex flex-wrap gap-2 mt-3">
          {authors.map(([authorText, authorValue]) => (
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
          classes="bg-black border-2 border-black text-white p-4 px-8
            disabled:bg-gray30 disabled:text-gray70 disabled:border-gray30"
          disabled={!location.formattedAddress}
        />
        <RoundedButton
          text="Clear"
          type="reset"
          classes="border-2 border-black rounded-full p-4 px-8
            disabled:text-gray30 disabled:border-gray30"
          onClick={() => reset()}
          disabled={!isDirty}
        />
      </div>
    </form>
  );
};

export default SearchCardsForm;
