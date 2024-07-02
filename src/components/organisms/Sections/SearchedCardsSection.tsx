'use client';

import React, { memo, useEffect, useRef, useState } from "react";
import { useSearchCards } from "@/src/queries";
import { ISearchCard, TripsPageView } from "@/src/services";
import { CardsSkeleton, IconButton } from "@/src/components/molecules";
import { Heading4, Icons } from "@/src/components/atoms";
import { Gallery, InfiniteList } from "@/src/components/organisms";
import { LoadingStateWrapper } from "@/src/components/templates";

interface SearchedCardsSectionProps {
  filterParams: ISearchCard | null;
  view: TripsPageView;
}

const SearchedCardsSection: React.FC<SearchedCardsSectionProps> 
= ({ filterParams, view }) => {
  const [page, setPage] = useState(0);
  const [lastPage, setLastPage] = useState<number | undefined>(undefined);

  const { 
    data, 
    fetchNextPage, 
    fetchPreviousPage,
    isFetchNextPageError,
    isFetchingNextPage,
    isFetchingPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetched,
    isLoading,
    fetchStatus,
  } = useSearchCards(filterParams, page);

  const pageCards = data?.pages?.[page]?.cards;

  useEffect(() => {
    if (isFetchNextPageError) {
      setLastPage(page - 1);
      setPage(curr => curr - 1);
    }
  }, [isFetchNextPageError]);

  const handleNextPage = () => {
    setPage(curr => curr + 1);

    if (!data?.pages?.[page + 1]) {
      fetchNextPage();
    }
  };

  const handlePrevPage = () => {
    setPage(curr => curr - 1);
    
    if (!data?.pages?.[page - 1]) {
      fetchPreviousPage();
    }
  };

  const isShowSkeleton = (isLoading && fetchStatus !== 'idle') 
    || (isFetchingNextPage && view === TripsPageView.Gallery);
  const isShowEmpty = isFetched && !data;

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (view === TripsPageView.Gallery) {
      scrollRef.current?.scrollIntoView({ 
        block: "end", behavior: 'smooth'
      });
    }
  }, [page, view]);

  return (
    <LoadingStateWrapper
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
      {view === TripsPageView.Gallery ? (
        <>
          <div className="absolute left-0 top-0 h-px" ref={scrollRef} />

          {pageCards && (
            <Gallery cards={pageCards} />
          )}

          <div className="flex w-full items-center justify-center gap-4">
            <IconButton 
              icon={<Icons.left className="order-2 h-6 w-6 text-inherit" />} 
              text="Previous" 
              classes="text-gray-80 hover:text-gray-70 disabled:text-gray-50" 
              onClick={handlePrevPage}
              disabled={isFetchingPreviousPage || !hasPreviousPage}
            />
            <IconButton 
              icon={<Icons.right className="h-6 w-6 text-inherit" />} 
              text="Next" 
              classes="text-gray-80 hover:text-gray-70 disabled:text-gray-50" 
              onClick={handleNextPage}
              disabled={isFetchingNextPage || !hasNextPage || page === lastPage}
            />
          </div>
        </>
      ) : (
        <>
          {data?.pages && (
            <InfiniteList 
              pages={data.pages} 
              isLastPage={page === lastPage}
              page={page}
              isFetchingNextPage={isFetchingNextPage}
              handleNextPage={handleNextPage}
            />
          )}
        </>
      )}
    </LoadingStateWrapper>
  );
};

export default memo(SearchedCardsSection);