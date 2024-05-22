'use client';

import { 
  Gallery, 
  SearchCardsForm, 
  Pagination 
} from "@/src/components/organisms";
import { useNormalizedError } from "@/src/hooks";
import { useSearchCards } from "@/src/queries";
import { ICard, ISearchCard } from "@/src/services";
import { memo, useEffect, useState } from "react";
import { ErrorText, Heading2 } from "@/src/components/atoms";
import { CARDS_PER_PAGE } from "@/src/lib/constants";
import { AxiosError } from "axios";

const TripsPage = () => {
  const [errorMessage, setErrorMessage] = useNormalizedError();
  const [filterParams, setFilterParams] = useState<ISearchCard | null>(null);
  const [page, setPage] = useState(0);

  const [cards, setCards] = useState<ICard[]>([]);
  const [isLastPage, setIsLastPage] = useState(false);

  const { data, isPlaceholderData, error } = useSearchCards(page, filterParams);

  useEffect(() => {
    if (data) {
      setCards(data.cards);

      if (data.cards.length < CARDS_PER_PAGE) {
        setIsLastPage(true);
      }
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      if (error instanceof AxiosError && error.response?.status === 404) {
        setIsLastPage(true);
      } else {
        setErrorMessage(error);
      }
    }
  }, [error]);

  return (
    <main className="grow overflow-hidden grid grid-cols-12 
      text-black bg-gray10 gap-5">
      <div className="col-span-3 overflow-y-scroll">
        <SearchCardsForm setFilterParams={setFilterParams} />
      </div>

      <div
        className="flex flex-col justify-between items-center gap-8 
          col-span-9 px-10 py-8 overflow-y-scroll"
      >
        {error && <ErrorText errorText={errorMessage} />}

        {cards.length ? (
          <>
            <Heading2 
              text="Places that suit your preferences" 
              font="semibold"
              classes="self-start"
            />

            <Gallery cards={cards} />

            <Pagination 
              page={page} 
              setPage={setPage} 
              isPlaceholderData={isPlaceholderData}
              isLastPage={isLastPage}
            />
          </>
        ) : (
          <Heading2 
            text="Please, select your location to start searching" 
            font="semibold"
            classes="m-auto"
          />
        )}
      </div>
    </main>
  );
};

export default memo(TripsPage);
