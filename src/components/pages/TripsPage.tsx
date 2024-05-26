'use client';

import { 
  Gallery, 
  SearchCardsForm, 
  Pagination 
} from "@/src/components/organisms";
import { useNormalizedError } from "@/src/hooks";
import { useSearchCards } from "@/src/queries";
import { cardService, ICard, ISearchCard } from "@/src/services";
import { memo, useEffect, useState } from "react";
import { ErrorText, Heading2 } from "@/src/components/atoms";
import { AxiosError } from "axios";
import defaultCards from "@/public/defaultCards.json";
import { useQueryClient } from "@tanstack/react-query";
import { LoadedContentStateController } from "@/src/components/moleculs";

// replace with infinite query

const TripsPage = () => {
  const [errorMessage, setErrorMessage] = useNormalizedError();
  const [filterParams, setFilterParams] = useState<ISearchCard | null>(null);
  const [page, setPage] = useState(0);

  // const queryClient = useQueryClient();
  // const [isQueryEnabled, setIsQueryEnabled] = useState(false);
  // const [isLastPage, setIsLastPage] = useState(false);
  // const [isGlobalError, setIsGlobalError] = useState(false);

  // const { 
  //   data, 
  //   isPlaceholderData, 
  //   error, 
  //   isLoading, 
  // } = useSearchCards(page, filterParams);

  // const handleQueryError = (error: any) => {
  //   if (error instanceof AxiosError && error.response?.status === 404) {
  //     setIsGlobalError(true);
  //   } else {
  //     setErrorMessage(error);
  //   }
  // };

  // const fetchNextPage = async() => {
  //   try {
  //     await queryClient.fetchQuery({
  //       queryKey: ['cards', page + 1, filterParams],
  //       queryFn: () => {
  //         if (filterParams) {
  //           return cardService.searchCards(page + 1, filterParams);
  //         }
    
  //         return null;
  //       },
  //     });

  //   } catch (error) {
  //     setIsLastPage(true);
  //   }
  // };

  // useEffect(() => {
  //   if (error) {
  //     handleQueryError(error);
  //   }
  // }, [error]);

  // useEffect(() => {
  //   if (isQueryEnabled) {
  //     fetchNextPage(); 
  //   }
  // }, [isQueryEnabled, page]);

  // useEffect(() => {
  //   if (!filterParams) {
  //     queryClient.removeQueries({
  //       queryKey: ['cards'],
  //     });
  //     setIsQueryEnabled(false);
  //   } else {
  //     if (!isQueryEnabled) {
  //       setIsQueryEnabled(true);
  //     }
  //   }
  // }, [filterParams]);

  return (
    <main className="grow overflow-hidden grid grid-cols-12 
      text-black bg-gray10">
      <div className="col-span-3 overflow-y-scroll">
        <SearchCardsForm setFilterParams={setFilterParams} />
      </div>

      <div
        className="flex flex-col justify-between items-center gap-8 
          col-span-9 px-10 py-8 overflow-y-scroll"
      >

        {isQueryEnabled ? (
          <LoadedContentStateController
            isError={isGlobalError}
            errorAlertFallbackComponent={
              <Heading2 
                text="No cards matching your preferences found. 
                    Try setting other filter parameters" 
                font="semibold"
                classes="m-auto"
              />
            }
            isLoading={isLoading}
            loadingFallbackComponent={
              <Heading2 
                text="Generating cards for you. 
                    This might take a couple of minutes..." 
                font="semibold"
                classes="m-auto animate-pulse"
              />
            }
          >
            {!!data && (
              <>
                {errorMessage && <ErrorText errorText={errorMessage} />}

                <Heading2 
                  text="Places that suit your preferences" 
                  font="semibold"
                  classes="self-start"
                />

                <Gallery cards={data.cards} />

                <Pagination 
                  page={page} 
                  setPage={setPage} 
                  isPlaceholderData={isPlaceholderData}
                  isLastPage={isLastPage}
                />
              </>
            )}
          </LoadedContentStateController>
        ) : (
          <>
            <Heading2 
              text="Top places preferred by our users" 
              font="semibold"
              classes="self-start"
            />

            <Gallery cards={defaultCards as ICard[]} />
          </>
        )}
      </div>
    </main>
  );
};

export default memo(TripsPage);
