'use client';

import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSearchCards } from "@/src/queries";
import { ICard, ISearchCard, ISearchCardResponse } from "@/src/services";
import { 
  LoadedContentStateController, 
  CardsSkeleton 
} from "@/src/components/molecules";
import { Heading4 } from "@/src/components/atoms";
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

  const { 
    data, 
    error, 
    isLoading,
    fetchStatus,
  } = useSearchCards(page, filterParams);

  const queryClient = useQueryClient();
  const pageCards = useMemo(() => 
    queryClient.getQueryData<ISearchCardResponse | undefined>(
      ['cards', page, filterParams]
    )?.cards,
  [page, queryClient, data]);

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
  }, [pageCards, view]);

  return (
    <>
      <div className="absolute left-0 top-0 h-px" ref={scrollRef} />
      <LoadedContentStateController
        isEmpty={isShowEmpty}
        emptyFallbackComponent={
          <div className="m-auto text-center">
            <Heading4 
              text="No cards matching your preferences found 😢." 
              font="medium"
              classes="text-gray-80"
            />
            <Heading4 
              text="Try setting other filter parameters"
              font="medium" 
              classes="text-gray-80"
            />
          </div>
        }
        isLoading={isShowSkeleton}
        loadingFallbackComponent={<CardsSkeleton />}
      >
        {view === 'Gallery' ? (
          <>
            {pageCards && (
              <Gallery cards={pageCards} />
            )}

            <Pagination 
              page={page} 
              setPage={setPage} 
              isLastPage={page === lastPage}
            />
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