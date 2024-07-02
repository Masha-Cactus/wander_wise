'use client';

import { memo, useEffect, useRef, useState } from "react";
import { usePopularCards } from "@/src/queries";
import { ISearchCardResponse, TripsPageView } from "@/src/services";
import { Heading, Loader, Icons } from "@/src/components/atoms";
import { Gallery, InfiniteList } from "@/src/components/organisms";
import { LoadingStateWrapper } from "@/src/components/templates";
import { IconButton } from "@/src/components/molecules";

interface PopularCardsSectionProps {
  view: TripsPageView;
}

const PopularCardsSection: React.FC<PopularCardsSectionProps> = ({ view }) => {
  const [page, setPage] = useState(0);
  const [displayedCards, setDisplayedCards] 
  = useState<ISearchCardResponse[]>([]);
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
  } = usePopularCards(page);

  const pageCards = data?.pages?.[page];

  useEffect(() => {
    if (data) {
      setDisplayedCards(curr => [...curr, {
        currentPage: page, 
        cards: data.pages[page]
      }]);
    }
  }, [data]);

  useEffect(() => {
    if (isFetchNextPageError) {
      setPage(page => page - 1);
      setLastPage(page - 1);
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

  const isShowLoader = (isLoading || isFetchingNextPage) 
    && view === TripsPageView.Gallery;
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
        <Heading 
          text="No cards found 😢" 
          font="normal"
          classes="m-auto"
        />
      }
      isLoading={isShowLoader}
      loadingFallbackComponent={<Loader size="lg" />}
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
              pages={displayedCards} 
              handleNextPage={handleNextPage}
              isLastPage={lastPage === page}
              page={page}
              isFetchingNextPage={isFetchingNextPage}
            />
          )}
        </>
        
      )}
    </LoadingStateWrapper>
  );
};

export default memo(PopularCardsSection);