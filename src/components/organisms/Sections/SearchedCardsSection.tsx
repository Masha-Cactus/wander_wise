'use client';

import { useSearchCards } from "@/src/queries";
import { ICard, ISearchCard } from "@/src/services";
import React, { memo, useEffect, useRef, useState } from "react";
import { 
  LoadedContentStateController, 
  CardsSkeleton 
} from "@/src/components/molecules";
import { Heading2 } from "@/src/components/atoms";
import { Pagination, Gallery, InfiniteList } from "@/src/components/organisms";
import { CARDS_PER_PAGE } from "@/src/lib/constants";

type Props = {
  filterParams: ISearchCard | null;
  view: 'Gallery' | 'List';
};

const PaginatedCardsSection: React.FC<Props> = ({ filterParams, view }) => {
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
    isLoading,
    fetchStatus,
  } = useSearchCards(page, filterParams);

  const isShowSkeleton = isLoading && fetchStatus !== 'idle' 
    && view === 'Gallery';
  const isShowEmpty = !!(lastPage && lastPage < 0);

  useEffect(() => {
    if (data && data.cards.length) {
      if (data.cards.length < CARDS_PER_PAGE) {
        setLastPage(page);
      }
      
      setDisplayedCards(curr => [...curr, ...data.cards]);
    }
  }, [data, filterParams, page]);

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
            text="No cards matching your preferences found 😢. 
                    Try setting other filter parameters" 
            font="semibold"
            classes="m-auto text-gray-80 text-center"
          />
        }
        isLoading={isShowSkeleton}
        loadingFallbackComponent={<CardsSkeleton />}
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
            isFetchingNextPage={isLoading && fetchStatus !== 'idle'}
          />
        )}
      </LoadedContentStateController>
    </>
  );
};

export default memo(PaginatedCardsSection);