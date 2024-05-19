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
    <main className="grid grid-cols-12 text-black bg-gray10 gap-5">
      <div className="col-span-3">
        <SearchCardsForm setFilterParams={setFilterParams} />
      </div>

      <div
        className="flex flex-col items-center gap-8 
          col-span-9 px-10 py-8"
      >
        {error && <ErrorText errorText={errorMessage} />}

        {cards && (
          <>
            <Heading2 
              text="Places that suit your preferences" 
              font="semibold"
              classes="self-start"
            />
            <Gallery cards={cards} />
          </>
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
