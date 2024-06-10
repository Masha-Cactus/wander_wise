"use client";

import {
  Divider,
  TextBase,
} from "@/src/components/atoms";
import {
  RoundedButton,
  FilterButton,
} from "@/src/components/molecules";
import {
  IFilterParams,
  ICard
} from "@/src/services";
import { useForm } from "react-hook-form";
import { filterCardsSchema } from "@/src/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { getFilterOptions, trimObjectFields } from "@/src/lib/helpers";
import { Dispatch, memo, SetStateAction, useMemo } from "react";
import { 
  ATMOSPHERES, 
  AUTHORS, 
  CLIMATES, 
  SPECIALS 
} from "@/src/lib/cardParameters";
import { useGetUserCreatedCards, useGetUserSavedCards } from "@/src/queries";

type Props = {
  type: 'Saved' | 'Created',
  setFilterParams: Dispatch<SetStateAction<IFilterParams | null>>
};

const FilterForm: React.FC<Props> = ({ type, setFilterParams }) => {
  const { data: savedCards } = useGetUserSavedCards();
  const { data: createdCards } = useGetUserCreatedCards();

  const { 
    atmospheres, 
    climates, 
    specials, 
    authors, 
    countries 
  } = useMemo(() => {
    let cardsToFilter: ICard[] = [];

    if (type === 'Saved' && savedCards) {
      cardsToFilter = savedCards;
    } else if (type === 'Created' && createdCards) {
      cardsToFilter = createdCards;
    }

    const filterOptions = getFilterOptions(cardsToFilter);

    const atmospheres = ATMOSPHERES
      .filter(tripType => filterOptions.tripTypes.includes(tripType));
    const climates = CLIMATES
      .filter(climate => filterOptions.climates.includes(climate));
    const specials = SPECIALS
      .filter(special => filterOptions.specialRequirements.includes(special));
    const authors = AUTHORS
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, authorValue]) => filterOptions.authors
        .includes(authorValue));
    const countries = Array.from(new Set(filterOptions.countries));
    
    return { 
      atmospheres, 
      climates, 
      specials, 
      authors, 
      countries, 
    };
  }, [savedCards, createdCards, type]);

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

  const onClear = () => {
    reset();
    setFilterParams(null);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="min-h-full flex flex-col justify-between
      bg-white border-r border-gray-30 pt-8"
    >
      <div className="flex flex-col w-full gap-8">

        {!!countries.length && (
          <>
            <div className="flex flex-col mx-10">
              <TextBase
                text="Country"
                font="semibold"
              />
              <div className="flex flex-wrap gap-2 mt-3">
                {countries.map((country) => (
                  <FilterButton
                    key={country}
                    control={control}
                    name="countries"
                    value={country}
                  />
                ))}
              </div>
            </div>

            <Divider />
          </>
        )}
      
        {!!atmospheres.length && (
          <>
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

            <Divider />
          </>
        )}
      

        {!!climates.length && (
          <>
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

            <Divider />
          </>
        )}
      
        {!!specials.length && (
          <>
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

            <Divider />
          </>
        )}
      
        {!!authors.length && (
          <>
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
          </>
        )}
      </div>

      <div className="flex gap-4 mx-10 my-8">
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

export default memo(FilterForm);