"use client";

import {
  Divider,
  TextBase,
} from "@/src/components/atoms";
import {
  RoundedButton,
  FilterButton,
} from "@/src/components/moleculs";
import {
  CardAuthors,
  Climate,
  SpecialRequirements,
  TripTypes,
  IFilterParams,
} from "@/src/services";
import { useForm } from "react-hook-form";
import { filterCardsSchema } from "@/src/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { getFilterOptions, trimObjectFields } from "@/src/lib/helpers";
import { useGetCreatedCards, useGetSavedCards } from "@/src/hooks";
import { Dispatch, SetStateAction } from "react";


type Props = {
  type: 'Saved' | 'Created',
  setFilterParams: Dispatch<SetStateAction<IFilterParams | null>>
};

const FilterForm: React.FC<Props> = ({ type, setFilterParams }) => {
  const savedCards = useGetSavedCards() || [];
  const createdCards = useGetCreatedCards() || [];

  const filterOptions = getFilterOptions(
    type === 'Saved' ? savedCards : createdCards,
  );

  const atmospheres = Object.values(TripTypes)
    .filter(tripType => filterOptions.tripTypes.includes(tripType));
  const climates = Object.values(Climate)
    .filter(climate => filterOptions.climates.includes(climate));
  const specials = Object.values(SpecialRequirements)
    .filter(special => filterOptions.specialRequirements.includes(special));
  const authors = Object.entries(CardAuthors)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([_, authorValue]) => filterOptions.authors.includes(authorValue));

  const validationSchema = filterCardsSchema();
  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty },
  } = useForm<IFilterParams>({
    defaultValues: {
      countries: [],
      tripTypes: [],
      specialRequirements: [],
      climates: [],
      authors: [],
    },
    resolver: yupResolver(validationSchema),
  });
  
  const onSubmit = async (data: IFilterParams) => {
    const trimmedData = trimObjectFields(data);
  
    setFilterParams(trimmedData);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col 
      bg-white border-2 border-gray-30 gap-8"
    >

      <div className="flex flex-col mx-10">
        <TextBase
          text="Country"
          font="semibold"
        />
        <div className="flex flex-wrap gap-2 mt-3">
          {filterOptions.countries.map((country) => (
            <FilterButton
              key={country}
              control={control}
              name="countries"
              value={country}
            />
          ))}
        </div>
      </div>

      <Divider classes="h-px w-full" />

      <div className="flex flex-col mx-10">
        <TextBase text="Type" font="semibold" />
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
        <TextBase text="Climate" font="semibold" />
        <div className="flex flex-wrap gap-2 mt-3">
          {climates.map((climate) => (
            <FilterButton
              key={climate}
              control={control}
              name="climates"
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
        <TextBase text="Cards are" font="semibold" />
        <div className="flex flex-wrap gap-2 mt-3">
          {authors.map(([authorText, authorValue]) => (
            <FilterButton 
              key={authorValue}
              name="authors"
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
          style="dark"
          classes="py-4 px-8"
        />
        <RoundedButton
          text="Clear"
          type="reset"
          style="light"
          classes="py-4 px-8"
          onClick={() => {
            reset();
            setFilterParams(null);
          }}
          disabled={!isDirty}
        />
      </div>
    </form>
  );
};

export default FilterForm;