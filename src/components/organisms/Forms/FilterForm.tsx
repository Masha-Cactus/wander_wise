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
} from "@/src/components/moleculs";
import {
  CardAuthors,
  Climate,
  SpecialRequirements,
  TravelDistance,
  TripTypes,
  ISearchCard,
} from "@/src/services";
import { useForm } from "react-hook-form";
import { searchCardsSchema } from "@/src/validation/searchCardsSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { trimObjectFields } from "@/src/lib/helpers";
import { Dispatch, SetStateAction } from "react";

const atmospheres = Object.values(TripTypes);
const climates = Object.values(Climate);
const specials = Object.values(SpecialRequirements);
const authors = Object.entries(CardAuthors);
const distance = Object.entries(TravelDistance);

type Props = {
  setFilterParams: Dispatch<SetStateAction<ISearchCard>>;
};

const FilterForm: React.FC<Props> = ({ setFilterParams }) => {
  const validationSchema = searchCardsSchema();
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<ISearchCard>({
    defaultValues: {
      author: [],
      startLocation: "",
      tripTypes: [],
      climate: [],
      specialRequirements: [],
      travelDistance: [],
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: ISearchCard) => {
    const trimmedData = trimObjectFields(data);

    setFilterParams(trimmedData);
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
            <CheckboxInput key={authorValue}
              name="author"
              control={control}
              text={authorText}
              value={authorValue}
            />
          ))}
        </div>
      </div>

      <div className="flex gap-4 mx-10 my-8">
        <RoundedButton
          text="Apply"
          type="submit"
          classes="bg-black text-white p-4 px-8"
        />
        <RoundedButton
          text="Clear"
          type="reset"
          classes="border-2 border-black rounded-full p-4 px-8"
          onClick={() => reset()}
        />
      </div>
    </form>
  );
};

export default FilterForm;
