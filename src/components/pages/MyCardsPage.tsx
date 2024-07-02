'use client';

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ICollection, IFilterParams } from "@/src/services";
import { 
  FilterForm, 
  FilteredCardsSection, 
  EmptyFallbackModal 
} from "@/src/components/organisms";
import { Loader } from "@/src/components/atoms";
import { Routes } from "@/src/lib/constants";
import { useGetUserCollections } from "@/src/queries";
import { 
  ScreenHeightLayout, 
  LoadingStateWrapper 
} from "@/src/components/templates";
import { selectCreatedCards } from "@/src/lib/collectionSelectors";

const MyCardsPage = () => {
  const [filterParams, setFilterParams] = useState<IFilterParams | null>(null);
  const { 
    data: createdCollection, 
    isLoading, 
  } = useGetUserCollections<ICollection>(selectCreatedCards);

  return (
    <ScreenHeightLayout>
      <AnimatePresence>
        <LoadingStateWrapper
          isEmpty={createdCollection && !createdCollection.cardDtos.length}
          emptyFallbackComponent={
            <EmptyFallbackModal
              key="emptyFallbackModal"
              title="You don’t have any created cards yet."
              subtitle="Create your first card now! 🌏"
              buttonText="Create"
              path={Routes.MY_CARDS.CREATE}
            />
          }
          isLoading={isLoading}
          loadingFallbackComponent={
            <div className="flex h-full w-full items-center justify-center">
              <Loader size="lg" />
            </div>
          }
        >
          {!!createdCollection?.cardDtos.length && (
            <div 
              className="grid h-full w-full 
              grid-cols-[345px,1fr] overflow-hidden"
            >
              <div className="overflow-y-scroll">
                <FilterForm type="Created" setFilterParams={setFilterParams} />
              </div>

              <div className="overflow-y-scroll">
                <FilteredCardsSection 
                  filterParams={filterParams} 
                  cards={createdCollection.cardDtos} 
                  title="My created cards" 
                  linkText="+ New card"
                  linkPath={Routes.MY_CARDS.CREATE}
                />
              </div>
            </div>
          )}
        </LoadingStateWrapper> 
      </AnimatePresence>   
    </ScreenHeightLayout>
  );
};

export default MyCardsPage;