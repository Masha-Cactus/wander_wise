'use client';

import React, { memo, useEffect, useRef, useState } from "react";
import { useSearchCards } from "@/src/queries";
import { ICard, ISearchCard, ISearchCardResponse, TripsPageView } from "@/src/services";
import { 
  LoadedContentStateController, 
  CardsSkeleton,
  IconButton
} from "@/src/components/molecules";
import { Heading4, Icons } from "@/src/components/atoms";
import { Gallery, InfiniteList } from "@/src/components/organisms";

interface PaginatedCardsSectionProps {
  filterParams: ISearchCard | null;
  view: TripsPageView;
}

const PaginatedCardsSection: React.FC<PaginatedCardsSectionProps> 
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
    isFetched,
    isLoading,
    fetchStatus,
  } = useSearchCards(filterParams);

  const pageCards = data?.pages?.[page]?.cards;

  useEffect(() => {
    if (isFetchNextPageError) {
      setPage(curr => curr - 1);
      setLastPage(page - 1);
    }
  }, [isFetchNextPageError])

  const handleNextPage = () => {
    setPage(curr => curr + 1);
    fetchNextPage();
  };

  const handlePrevPage = () => {
    setPage(curr => curr - 1);
    fetchPreviousPage();
  };

  const isShowSkeleton = ((isLoading && fetchStatus !== 'idle') || isFetchingNextPage) 
    && view === TripsPageView.Gallery;
  const isShowEmpty = isFetched && !data;

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef && view === TripsPageView.Gallery) {
      scrollRef.current?.scrollIntoView({ block: "end", behavior: 'smooth' });
    }
  }, [isFetchingNextPage, view]);

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
        {view === TripsPageView.Gallery ? (
          <>
            {pageCards && (
              <Gallery cards={pageCards} />
            )}

            <div className="flex w-full gap-4 justify-center items-center">
              <IconButton 
                icon={<Icons.left className="h-6 w-6 text-inherit order-2" />} 
                text="Previous" 
                classes="text-gray-80 hover:text-gray-70 disabled:text-gray-50" 
                onClick={handlePrevPage}
                disabled={isFetchingPreviousPage || page === 0}
              />
              <IconButton 
                icon={<Icons.right className="h-6 w-6 text-inherit" />} 
                text="Next" 
                classes="text-gray-80 hover:text-gray-70 disabled:text-gray-50" 
                onClick={handleNextPage}
                disabled={isFetchingNextPage || page === lastPage}
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
      </LoadedContentStateController>
    </>
  );
};

export default memo(PaginatedCardsSection);