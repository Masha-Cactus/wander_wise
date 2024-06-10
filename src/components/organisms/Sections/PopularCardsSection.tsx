'use client';

import { usePopularCards } from "@/src/queries";
import { ICard } from "@/src/services";
import { memo, useEffect, useRef, useState } from "react";
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

  const pageCards = displayedCards.slice(
    CARDS_PER_PAGE * page, 
    CARDS_PER_PAGE * (page + 1)
  );

  const { 
    data, 
    error, 
    isLoading
  } = usePopularCards(page);

  const isShowSkeleton = isLoading && view === 'Gallery';
  const isShowEmpty = !!(lastPage && lastPage < 0);

  useEffect(() => {
    if (data && data.length) {
      if (data.length < CARDS_PER_PAGE) {
        setLastPage(page);
      }
      
      setDisplayedCards(curr => [...curr, ...data]);
    }
  }, [data, page]);

  useEffect(() => {
    if (error) {
      setPage(page => page - 1);
      setLastPage(page - 1);
    }
  }, [error]);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef && view === 'Gallery') {
      scrollRef.current?.scrollIntoView({ block: "end", behavior: 'smooth' });
    }
  }, [displayedCards, view]);

  return (
    <>
      <div className="h-px absolute left-0 top-0" ref={scrollRef} />
      <LoadedContentStateController
        isEmpty={isShowEmpty}
        emptyFallbackComponent={
          <Heading2 
            text="No cards found" 
            font="semibold"
            classes="m-auto"
          />
        }
        isLoading={isShowSkeleton}
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