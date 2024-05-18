'use client';

import { Gallery, FilterForm, Pagination } from "@/src/components/organisms";
import { useNormalizedError } from "@/src/hooks";
import { useSearchCards } from "@/src/queries";
import { ICard, ISearchCard } from "@/src/services";
import { memo, useEffect, useState } from "react";
import { ErrorText } from "@/src/components/atoms";

type Props = {};

const TripsPage: React.FC<Props> = ({}) => {
  const [errorMessage, setErrorMessage] = useNormalizedError();
  const [filterParams, setFilterParams] = useState<ISearchCard | null>(null);
  const [page, setPage] = useState(0);

  const [cards, setCards] = useState<ICard[]>([]);
  const [isLastPage, setIsLastPage] = useState(false);

  const { data, isPlaceholderData, error } = useSearchCards(page, filterParams);

  useEffect(() => {
    if (data) {
      setCards(data);

      if (data.length < 8) {
        setIsLastPage(true);
      }
    }
  }, [page, data]);

  useEffect(() => {
    if (error) {
      setErrorMessage(error);
    }
  }, [error]);

  return (
    <main className="grid grid-cols-12 grid-rows-3 text-black bg-gray10 gap-5">
      <div className="col-span-3 row-span-3">
        <FilterForm setFilterParams={setFilterParams} />
      </div>

      <div
        className="flex flex-col justify-between items-center gap-6 
    col-start-4 col-span-9"
      >
        {error && <ErrorText errorText={errorMessage} />}

        {cards && (
          <Gallery cards={cards} />
        )}

        <Pagination 
          page={page} 
          setPage={setPage} 
          isPlaceholderData={isPlaceholderData}
          isLastPage={isLastPage}
        />
      </div>
    </main>
  );
};

export default memo(TripsPage);
