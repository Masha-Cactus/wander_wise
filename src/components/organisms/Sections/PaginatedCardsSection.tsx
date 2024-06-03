'use client';

import { useSearchCards } from "@/src/queries";
import { ICard, ISearchCard } from "@/src/services";
import { memo, useEffect, useRef, useState } from "react";
import { LoadedContentStateController } from "@/src/components/moleculs";
import { Heading2 } from "@/src/components/atoms";
import { Pagination, Gallery } from "@/src/components/organisms";
import { CARDS_PER_PAGE } from "@/src/lib/constants";

type Props = {
  filterParams: ISearchCard | null;
};

const PaginatedCardsSection: React.FC<Props> = ({ filterParams }) => {
  const [page, setPage] = useState(0);
  const [displayedCards, setDisplayedCards] = useState<ICard[]>([]);
  const [lastPage, setLastPage] = useState<number | undefined>(undefined);
  const [isNothingFound, setIsNothingFound] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { 
    data, 
    error, 
    failureCount,
    isLoading,
    fetchStatus,
  } = useSearchCards(page, filterParams);

  const handleDataAbsence = () => {
    if (displayedCards.length) {
      setPage(page - 1);
      setLastPage(page - 1);
    } else {
      setIsNothingFound(true);
    }
  };

  useEffect(() => {
    if (data) {
      if (!data.cards.length) {
        handleDataAbsence();
      } else {
        if (data.cards.length < CARDS_PER_PAGE) {
          setLastPage(page);
        }

        setDisplayedCards(data.cards);
      } 

    }
  }, [data, filterParams]);

  useEffect(() => {
    if (error && failureCount >= 3) {
      handleDataAbsence();
    }
  }, [error, failureCount, handleDataAbsence]);

  useEffect(() => {
    if (scrollRef) {
      scrollRef.current?.scrollIntoView({ block: "end", behavior: 'smooth' });
    }
  }, [displayedCards]);

  return (
    <>
    <div className="h-px absolute left-0 top-0" ref={scrollRef} />
    <LoadedContentStateController
      isEmpty={isNothingFound}
      emptyFallbackComponent={
        <Heading2 
          text="No cards matching your preferences found. 
                    Try setting other filter parameters" 
          font="semibold"
          classes="m-auto"
        />
      }
      isLoading={isLoading && fetchStatus !== 'idle'}
      loadingFallbackComponent={
        <Heading2 
          text="Generating cards for you. 
                    This might take a couple of minutes..." 
          font="semibold"
          classes="m-auto animate-pulse text-center"
        />
      }
    >
      <Heading2 
        text="Places that suit your preferences" 
        font="semibold"
        classes="self-start"
      />

      <Gallery cards={displayedCards} />

      <Pagination 
        page={page} 
        setPage={setPage} 
        isLastPage={page === lastPage}
      />
            
    </LoadedContentStateController>
    </>
  );
};

export default memo(PaginatedCardsSection);