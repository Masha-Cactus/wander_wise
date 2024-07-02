'use client';

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { 
  FilterForm, 
  FilteredCardsSection, 
  EmptyFallbackModal 
} from "@/src/components/organisms";
import { Loader } from "@/src/components/atoms";
import { IFilterParams, ICollection } from "@/src/services";
import { Routes } from "@/src/lib/constants";
import { useGetUserCollections } from "@/src/queries";
import { 
  ScreenHeightLayout, 
  LoadingStateWrapper 
} from "@/src/components/templates";
import { selectSavedCards } from "@/src/lib/collectionSelectors";

const SavedPage = () => {
  const [filterParams, setFilterParams] = useState<IFilterParams | null>(null);
  const { data: savedCollection, isLoading } 
    = useGetUserCollections<ICollection>(selectSavedCards);

  return (
    <ScreenHeightLayout>
      <AnimatePresence>
        <LoadingStateWrapper
          isEmpty={savedCollection && !savedCollection.cardDtos.length}
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
              <Loader size="lg" />
            </div>
          }
        >
          {!!savedCollection?.cardDtos.length && (
            <div 
              className="grid h-full w-full 
              grid-cols-[345px,1fr] overflow-hidden"
            >
              <div className="overflow-y-scroll">
                <FilterForm type="Saved" setFilterParams={setFilterParams} />
              </div>

              <div className="overflow-y-scroll">
                <FilteredCardsSection 
                  filterParams={filterParams} 
                  cards={savedCollection.cardDtos} 
                  title="My saved cards" 
                  linkText="My collections"
                  linkPath={Routes.COLLECTIONS.MAIN}
                />
              </div>
            </div>
          )}
        </LoadingStateWrapper>
      </AnimatePresence>
    </ScreenHeightLayout>
  );
};

export default SavedPage;