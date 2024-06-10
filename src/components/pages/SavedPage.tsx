'use client';

import { useState } from "react";
import { 
  FilterForm, 
  SavedCardsSection, 
  EmptyFallbackModal 
} from "@/src/components/organisms";
import { Loader, Divider } from "@/src/components/atoms";
import { LoadedContentStateController } from "@/src/components/molecules";
import { IFilterParams } from "@/src/services";
import { Routes } from "@/src/lib/constants";
import { useGetUserSavedCards } from "@/src/queries";

const SavedPage = () => {
  const [filterParams, setFilterParams] = useState<IFilterParams | null>(null);
  const { data: savedCards, isLoading } = useGetUserSavedCards();

  return (
    <main className="grow overflow-hidden bg-gray-10">
      <Divider />
      <LoadedContentStateController
        isEmpty={savedCards && !savedCards.length}
        emptyFallbackComponent={
          <EmptyFallbackModal
            title="You don’t have any saved cards yet."
            subtitle="Explore our community 🌏"
            buttonText="Continue"
            path={Routes.TRIPS}
          />
        }
        isLoading={isLoading}
        loadingFallbackComponent={
          <div className="w-full h-full flex items-center justify-center">
            <Loader />
          </div>
        }
      >
        <div className="w-full h-full overflow-hidden 
          grid grid-cols-[345px,1fr]">
          <div className="overflow-y-scroll">
            <FilterForm type="Saved" setFilterParams={setFilterParams} />
          </div>

          <div className="overflow-y-scroll">
            <SavedCardsSection filterParams={filterParams} />
          </div>
        </div>
      </LoadedContentStateController>
    </main>
  );
};

export default SavedPage;