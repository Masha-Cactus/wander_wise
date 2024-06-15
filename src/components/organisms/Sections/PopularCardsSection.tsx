'use client';

import { memo, useEffect, useMemo, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { usePopularCards } from "@/src/queries";
import { ICard } from "@/src/services";
import { LoadedContentStateController } from "@/src/components/molecules";
import { Heading } from "@/src/components/atoms";
import { Pagination, Gallery, InfiniteList } from "@/src/components/organisms";
import { CARDS_PER_PAGE } from "@/src/lib/constants";

type Props = {
  view: 'Gallery' | 'List';
};

const PopularCardsSection: React.FC<Props> = ({ view }) => {
  const [page, setPage] = useState(0);
  const [displayedCards, setDisplayedCards] = useState<ICard[]>([]);
  const [lastPage, setLastPage] = useState<number | undefined>(undefined);

  const { 
    data, 
    error, 
    isLoading
  } = usePopularCards(page);

  const queryClient = useQueryClient();
  const pageCards = useMemo(() => 
    queryClient.getQueryData<ICard[] | undefined>(['popular-cards', { page }]),
  [page, queryClient, data]);

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
  }, [pageCards, view]);

  return (
    <>
      <div className="absolute left-0 top-0 h-px" ref={scrollRef} />
      <LoadedContentStateController
        isEmpty={isShowEmpty}
        emptyFallbackComponent={
          <Heading 
            text="No cards found 😢" 
            font="normal"
            classes="m-auto"
          />
        }
        isLoading={isShowSkeleton}
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
            isFetchingNextPage={isLoading}
          />
        )}
      </LoadedContentStateController>
    </>
  );
};

export default memo(PopularCardsSection);