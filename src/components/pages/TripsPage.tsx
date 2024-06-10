'use client';

import { 
  SearchCardsForm, 
  SearchedCardsSection,
  PopularCardsSection 
} from "@/src/components/organisms";
import { ISearchCard } from "@/src/services";
import { memo, useState } from "react";
import { Heading2, Divider } from "@/src/components/atoms";
import { ViewSwitcher } from "@/src/components/molecules";

type View = 'Gallery' | 'List';

const TripsPage = () => {
  const [filterParams, setFilterParams] = useState<ISearchCard | null>(null);
  const [view, setView] = useState<View>('Gallery');

  return (
    <main className="grow overflow-hidden bg-gray-10">
      <Divider />
      <div className="w-full h-full grid grid-cols-[345px,1fr] overflow-hidden">
        <div className="overflow-y-scroll">
          <SearchCardsForm setFilterParams={setFilterParams} />
        </div>

        <div
          className="flex flex-col justify-between items-center gap-8 
          px-10 pt-8 overflow-y-scroll relative"
        >

          <div className="flex w-full justify-between">
            <Heading2 
              text={filterParams 
                ? "Places that suit your preferences" 
                : "Top places preferred by our users"
              } 
              font="semibold"
              classes="self-start"
            />

            <ViewSwitcher view={view} setView={setView} />
          </div>

          {!!filterParams ? (
            <SearchedCardsSection 
              key={JSON.stringify(filterParams)} 
              filterParams={filterParams} 
              view={view} 
            />
          ) : (
            <PopularCardsSection view={view} />
          )}
        </div>
      </div>
    </main>
  );
};

export default memo(TripsPage);
