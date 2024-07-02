"use client";

import { 
  Dispatch, 
  memo, 
  SetStateAction, 
  useCallback, 
  useEffect, 
  useMemo 
} from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Divider,
  TextBase,
} from "@/src/components/atoms";
import {
  RoundedButton,
  ButtonCheckboxInput,
} from "@/src/components/molecules";
import {
  IFilterParams,
  ICard,
  ICollection
} from "@/src/services";
import { filterCardsSchema } from "@/src/validation";
import { getFilterOptions, trimObjectFields } from "@/src/lib/helpers";
import { 
  ATMOSPHERES, 
  AUTHORS, 
  CLIMATES, 
  SPECIALS 
} from "@/src/lib/cardParameters";
import { useGetUserCollections } from "@/src/queries";
import { 
  selectCreatedCards, 
  selectSavedCards 
} from "@/src/lib/collectionSelectors";

interface FilterFormProps {
  type: 'Saved' | 'Created',
  setFilterParams: Dispatch<SetStateAction<IFilterParams | null>>
}

const FilterForm: React.FC<FilterFormProps> = ({ type, setFilterParams }) => {
  const selectFn = type === 'Saved'
    ? selectSavedCards
    : selectCreatedCards;

  const { data: collection } = useGetUserCollections<ICollection>(selectFn);

  const { 
    atmospheres, 
    climates, 
    specials, 
    authors, 
    countries 
  } = useMemo(() => {
    let cardsToFilter: ICard[] = [];

    if (collection) {
      cardsToFilter = collection.cardDtos;
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
  }, [collection]);

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
  
  const onSubmit: SubmitHandler<IFilterParams> = (data) => {
    const trimmedData = trimObjectFields(data);
  
    setFilterParams(trimmedData);
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
      className="flex min-h-full flex-col justify-between
      border-r border-gray-30 bg-white pt-8"
    >
      <div className="flex w-full flex-col gap-8">

        {!!countries.length && (
          <>
            <div className="mx-10 flex flex-col">
              <TextBase
                text="Country"
                font="semibold"
              />
              <div className="mt-3 flex flex-wrap gap-2">
                {countries.map((country) => (
                  <ButtonCheckboxInput
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
            <div className="mx-10 flex flex-col">
              <TextBase text="Type" font="semibold" />
              <div className="mt-3 flex flex-wrap gap-2">
                {atmospheres.map((atmosphere) => (
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
          </>
        )}
      

        {!!climates.length && (
          <>
            <div className="mx-10 flex flex-col">
              <TextBase text="Climate" font="semibold" />
              <div className="mt-3 flex flex-wrap gap-2">
                {climates.map((climate) => (
                  <ButtonCheckboxInput
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
            <div className="mx-10 flex flex-col">
              <TextBase text="Special requirements" font="semibold" />
              <div className="mt-3 flex flex-wrap gap-2">
                {specials.map((special) => (
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
          </>
        )}
      
        {!!authors.length && (
          <>
            <div className="mx-10 flex flex-col">
              <TextBase text="Cards are" font="semibold" />
              <div className="mt-3 flex flex-wrap gap-2">
                {authors.map(([authorText, authorValue]) => (
                  <ButtonCheckboxInput 
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

      <div className="mx-10 my-8 flex gap-4">
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