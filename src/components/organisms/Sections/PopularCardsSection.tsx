'use client';

import { usePopularCards } from "@/src/queries";
import { ICard } from "@/src/services";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import { LoadedContentStateController } from "@/src/components/molecules";
import { Heading2 } from "@/src/components/atoms";
import { Pagination, Gallery, InfiniteList } from "@/src/components/organisms";
import { CARDS_PER_PAGE } from "@/src/lib/constants";

type Props = {
  view: 'Gallery' | 'List';
};

const PopularCardsSection: React.FC<Props> = ({ view }) => {
  const [page, setPage] = useState(0);
  const [displayedCards, setDisplayedCards] = useState<ICard[]>([]);
  const [lastPage, setLastPage] = useState<number | undefined>(undefined);
  const [isNothingFound, setIsNothingFound] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { 
    data, 
    error, 
    isLoading,
  } = usePopularCards(page);

  const pageCards = useMemo(() =>  displayedCards.slice(
    CARDS_PER_PAGE * page, 
    CARDS_PER_PAGE * (page + 1)
  ), [displayedCards, page]);

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
      if (!data.length) {
        handleDataAbsence();
      } else {
        if (data.length < CARDS_PER_PAGE) {
          setLastPage(page);
        }

        setDisplayedCards(curr => [...curr, ...data]);
      } 
    }
  }, [data, page]);

  useEffect(() => {
    if (error) {
      handleDataAbsence();
    }
  }, [error]);

  useEffect(() => {
    if (scrollRef && view === 'Gallery') {
      scrollRef.current?.scrollIntoView({ block: "end", behavior: 'smooth' });
    }
  }, [displayedCards, view]);

  return (
    <>
      <div className="h-px absolute left-0 top-0" ref={scrollRef} />
      <LoadedContentStateController
        isEmpty={isNothingFound}
        emptyFallbackComponent={
          <Heading2 
            text="No cards found" 
            font="semibold"
            classes="m-auto"
          />
        }
        isLoading={isLoading}
      >
        {view === 'Gallery' ? (
          <>
            <Gallery cards={pageCards} />

            <Pagination 
              page={page} 
              setPage={setPage} 
              isLastPage={page === lastPage}
            />

            <span />
          </>
        ) : (
          <InfiniteList 
            cards={displayedCards} 
            setPage={setPage} 
            isLastPage={page === lastPage}
            page={page}
            isFetchingNextPage={isLoading}
          />
        )}
        
            
      </LoadedContentStateController>
    </>
  );
};

export default memo(PopularCardsSection);