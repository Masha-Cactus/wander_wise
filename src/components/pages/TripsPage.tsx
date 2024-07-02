'use client';

import { useState } from "react";
import { 
  SearchCardsForm, 
  SearchedCardsSection,
  PopularCardsSection 
} from "@/src/components/organisms";
import { ISearchCard, TripsPageView } from "@/src/services";
import { Heading2 } from "@/src/components/atoms";
import { ViewSwitcher } from "@/src/components/molecules";
import { ScreenHeightLayout } from "@/src/components/templates";

const TripsPage = () => {
  const [filterParams, setFilterParams] = useState<ISearchCard | null>(null);
  const [view, setView] = useState<TripsPageView>(TripsPageView.Gallery);

  return (
    <ScreenHeightLayout>
      <div className="grid h-full w-full grid-cols-[345px,1fr] overflow-hidden">
        <div className="overflow-y-scroll">
          <SearchCardsForm setFilterParams={setFilterParams} />
        </div>

        <div
          className="relative flex flex-col items-center
          justify-between gap-8 overflow-auto px-10 py-8"
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
    </ScreenHeightLayout>
  );
};

export default TripsPage;
