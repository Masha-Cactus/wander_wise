'use client';

import { 
  Gallery, 
  SearchCardsForm, 
  PaginatedCardsSection 
} from "@/src/components/organisms";
import { ISearchCard } from "@/src/services";
import { memo, useState } from "react";
import { Heading2 } from "@/src/components/atoms";
import { usePopularCards } from "@/src/queries";

const TripsPage = () => {
  const [filterParams, setFilterParams] = useState<ISearchCard | null>(null);
  const { data: popularCards} = usePopularCards();

  // const getCachedPageData = (page) => {
  //   const cachedData = queryClient.getQueryData(['cards']);

  //   if (cachedData) {
  //     const pageData = cachedData.pages.find(
  //       (_, index) => index === page
  //     );
  //     return pageData;
  //   }
  //   return null;
  // };


  return (
    <main className="grow overflow-hidden grid grid-cols-12 
      text-black bg-gray10">
      <div className="col-span-3 overflow-y-scroll">
        <SearchCardsForm setFilterParams={setFilterParams} />
      </div>

      <div
        className="flex flex-col justify-between items-center gap-8 
          col-span-9 px-10 py-8 overflow-y-scroll relative"
      >

        {!!filterParams ? (
          <PaginatedCardsSection filterParams={filterParams} />
        ) : (
          <>
            <Heading2 
              text="Top places preferred by our users" 
              font="semibold"
              classes="self-start"
            />

            <Gallery cards={popularCards || []} />
          </>
        )}
      </div>
    </main>
  );
};

export default memo(TripsPage);
