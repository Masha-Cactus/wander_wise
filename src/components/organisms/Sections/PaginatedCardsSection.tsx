'use client';

import { useSearchCards } from "@/src/queries";
import { ICard, ISearchCard } from "@/src/services";
import { memo, useEffect, useState } from "react";
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
  const [isLastPage, setIsLastPage] = useState(false);
  const [isNothingFound, setIsNothingFound] = useState(false);

  const { 
    data, 
    error, 
    failureCount,
    isLoading,
    fetchStatus,
  } = useSearchCards(page, filterParams);

  const handleDataAbsence = () => {
    if (displayedCards.length) {
      setIsLastPage(true);
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
          setIsLastPage(true);
        }

        setDisplayedCards(data.cards);
      } 

    }
  }, [data, filterParams, page, displayedCards]);

  useEffect(() => {
    if (error && failureCount >= 3) {
      handleDataAbsence();
    }
  }, [error, failureCount, displayedCards]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [displayedCards]);

  return (
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
        isLastPage={isLastPage}
      />
            
    </LoadedContentStateController>
  );
};

export default memo(PaginatedCardsSection);