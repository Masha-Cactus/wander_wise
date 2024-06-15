'use client';

import { memo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { IFilterParams } from "@/src/services";
import { 
  FilterForm, 
  CreatedCardsSection, 
  EmptyFallbackModal 
} from "@/src/components/organisms";
import { Loader } from "@/src/components/atoms";
import { LoadedContentStateController } from "@/src/components/molecules";
import { Routes } from "@/src/lib/constants";
import { useGetUserCreatedCards } from "@/src/queries";
import { ScreenHeightLayout } from "@/src/components/templates";

const MyCardsPage = () => {
  const [filterParams, setFilterParams] = useState<IFilterParams | null>(null);
  const { data: createdCards, isLoading } = useGetUserCreatedCards();

  return (
    <ScreenHeightLayout>
      <AnimatePresence>
        <LoadedContentStateController
          isEmpty={createdCards && !createdCards.length}
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
              <Loader />
            </div>
          }
        >
          <div 
            className="grid h-full w-full grid-cols-[345px,1fr] overflow-hidden"
          >
            <div className="overflow-y-scroll">
              <FilterForm type="Created" setFilterParams={setFilterParams} />
            </div>

            <div className="overflow-y-scroll">
              <CreatedCardsSection filterParams={filterParams} />
            </div>
          </div>
        </LoadedContentStateController> 
      </AnimatePresence>   
    </ScreenHeightLayout>
  );
};

export default memo(MyCardsPage);