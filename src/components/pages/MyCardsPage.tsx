'use client';

import { IFilterParams } from "@/src/services";
import { useState } from "react";
import { 
  FilterForm, 
  CreatedCardsSection, 
  EmptyFallbackModal 
} from "@/src/components/organisms";
import { Loader, Divider } from "@/src/components/atoms";
import { LoadedContentStateController } from "@/src/components/molecules";
import { Routes } from "@/src/lib/constants";
import { useGetUserCreatedCards } from "@/src/queries";

const MyCardsPage = () => {
  const [filterParams, setFilterParams] = useState<IFilterParams | null>(null);
  const { data: createdCards, isLoading } = useGetUserCreatedCards();

  return (
    <main className="grow overflow-hidden bg-gray-10">
      <Divider />
      <LoadedContentStateController
        isEmpty={createdCards && !createdCards.length}
        emptyFallbackComponent={
          <EmptyFallbackModal
            title="You don’t have any created cards yet."
            subtitle="Create your first card now! 🌏"
            buttonText="Create"
            path={Routes.MY_CARDS.CREATE}
          />
        }
        isLoading={isLoading}
        loadingFallbackComponent={
          <div className="w-full h-full flex items-center justify-center">
            <Loader />
          </div>
        }
      >
        <div 
          className="w-full h-full overflow-hidden 
          grid grid-cols-[345px,1fr]"
        >
          <div className="overflow-y-scroll">
            <FilterForm type="Created" setFilterParams={setFilterParams} />
          </div>

          <div className="overflow-y-scroll">
            <CreatedCardsSection filterParams={filterParams} />
          </div>
        </div>
      </LoadedContentStateController>    
    </main>
  );
};

export default MyCardsPage;