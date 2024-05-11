"use client";

import { Divider } from "@/src/components/atoms";
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
import { Controller, useForm } from "react-hook-form";
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
  setFilterParams: Dispatch<SetStateAction<ISearchCard>>,
};

const FilterForm: React.FC<Props> = ({setFilterParams}) => {
  const validationSchema = searchCardsSchema();
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    control,
  } = useForm<ISearchCard>({
    defaultValues: {
      author: [],
      startLocation: '',
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
        <h2 className="text-base font-semibold">Where are you now?</h2>
        <p className="text-xs text-regular mt-2">
          We need this info to build distance of your trip
        </p>
        <LocationInput
          onChange={(value) => setValue('startLocation', value)}
        />
      </div>

      <Divider classes="h-px w-full" />

      <div className="flex flex-col mx-10">
        <h2 className="text-base font-semibold">
          What is your preferred travel distance?
        </h2>
        <p className="text-xs text-regular mt-2">
          We need this info to figure out the scale of your trip
        </p>
        <div className="flex flex-wrap gap-3 mt-3">
          {distance.map(([distanceText, distanceValue]) => (
            <Controller
              key={distanceValue}
              control={control}
              name="travelDistance"
              render={({ field }) => (
                <CheckboxInput
                  {...field}
                  value={distanceText}
                  onClick={() => {
                    field.onChange(field.value.includes(distanceValue)
                      ? field.value.filter(v => v !== distanceValue)
                      : [...field.value, distanceValue]
                    ); 
                  }}
                  selected={field.value.includes(distanceValue)}
                />
              )}
            />
          ))}
        </div>
      </div>

      <Divider classes="h-px w-full" />

      <div className="flex flex-col mx-10">
        <h2 className="text-base font-semibold">Type of your trip</h2>
        <div className="flex flex-wrap gap-2 mt-3">
          {atmospheres.map((atmosphere) => (
            <Controller
              key={atmosphere}
              control={control}
              name="tripTypes"
              render={({ field }) => (
                <FilterButton
                  {...field}
                  value={atmosphere}
                  onClick={() => {
                    field.onChange(field.value.includes(atmosphere)
                      ? field.value.filter(v => v !== atmosphere)
                      : [...field.value, atmosphere]
                    ); 
                  }}
                  selected={field.value.includes(atmosphere)}
                />
              )}
            />
          ))}
        </div>
      </div>

      <Divider classes="h-px w-full" />

      <div className="flex flex-col mx-10">
        <h2 className="text-base font-semibold">Desired climate</h2>
        <div className="flex flex-wrap gap-2 mt-3">
          {climates.map((climate) => (
            <Controller
              key={climate}
              control={control}
              name="climate"
              render={({ field }) => (
                <FilterButton
                  {...field}
                  value={climate}
                  onClick={() => {
                    field.onChange(field.value.includes(climate)
                      ? field.value.filter(v => v !== climate)
                      : [...field.value, climate]
                    ); 
                  }}
                  selected={field.value.includes(climate)}
                />
              )}
            />
          ))}
        </div>
      </div>

      <Divider classes="h-px w-full" />

      <div className="flex flex-col mx-10">
        <h2 className="text-base font-semibold">Specials</h2>
        <div className="flex flex-wrap gap-2 mt-3">
          {specials.map((special) => (
            <Controller
              key={special}
              control={control}
              name="specialRequirements"
              render={({ field }) => (
                <FilterButton
                  {...field}
                  value={special}
                  onClick={() => {
                    field.onChange(field.value.includes(special)
                      ? field.value.filter(v => v !== special)
                      : [...field.value, special]
                    ); 
                  }}
                  selected={field.value.includes(special)}
                />
              )}
            />
          ))}
        </div>
      </div>

      <Divider classes="h-px w-full" />

      <div className="flex flex-col mx-10">
        <h2 className="text-base font-semibold">Cards are</h2>
        <div className="flex flex-wrap gap-2 mt-3">
          {authors.map(([authorText, authorValue]) => (
            <Controller
              key={authorValue}
              control={control}
              name="author"
              render={({ field }) => (
                <CheckboxInput
                  {...field}
                  value={authorText}
                  onClick={() => {
                    field.onChange(field.value.includes(authorValue)
                      ? field.value.filter(v => v !== authorValue)
                      : [...field.value, authorValue]
                    ); 
                  }}
                  selected={field.value.includes(authorValue)}
                />
              )}
            />
          ))}
        </div>
      </div>

      {errors?.startLocation && (
        <p className="px-10 text-error text-sm">
          {errors?.startLocation.message}
        </p>
      )}

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
