'use client';

import { memo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { 
  FilterForm, 
  SavedCardsSection, 
  EmptyFallbackModal 
} from "@/src/components/organisms";
import { Loader } from "@/src/components/atoms";
import { LoadedContentStateController } from "@/src/components/molecules";
import { IFilterParams } from "@/src/services";
import { Routes } from "@/src/lib/constants";
import { useGetUserSavedCards } from "@/src/queries";
import { ScreenHeightLayout } from "@/src/components/templates";

const SavedPage = () => {
  const [filterParams, setFilterParams] = useState<IFilterParams | null>(null);
  const { data: savedCards, isLoading } = useGetUserSavedCards();

  return (
    <ScreenHeightLayout>
      <AnimatePresence>
        <LoadedContentStateController
          isEmpty={savedCards && !savedCards.length}
          emptyFallbackComponent={
            <EmptyFallbackModal
              key="emptyFallbackModal"
              title="You don’t have any saved cards yet."
              subtitle="Explore our community 🌏"
              buttonText="Continue"
              path={Routes.TRIPS}
            />
          }
          isLoading={isLoading}
          loadingFallbackComponent={
            <div className="flex h-full w-full items-center justify-center">
              <Loader />
            </div>
          }
        >
          <div 
            className="grid h-full w-full grid-cols-[345px,1fr] overflow-hidden"
          >
            <div className="overflow-y-scroll">
              <FilterForm type="Saved" setFilterParams={setFilterParams} />
            </div>

            <div className="overflow-y-scroll">
              <SavedCardsSection filterParams={filterParams} />
            </div>
          </div>
        </LoadedContentStateController>
      </AnimatePresence>
    </ScreenHeightLayout>
  );
};

export default memo(SavedPage);