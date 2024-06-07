'use client';

import { useState } from "react";
import { FilterForm, SavedCardsSection } from "@/src/components/organisms";
import { Heading, Heading4, Loader } from "@/src/components/atoms";
import { 
  PrimaryButton, 
  LoadedContentStateController 
} from "@/src/components/molecules";
import { IFilterParams } from "@/src/services";
import { useRouter } from "next/navigation";
import { Routes } from "@/src/lib/constants";
import { useGetUserSavedCards } from "@/src/queries";

const SavedPage = () => {
  const [filterParams, setFilterParams] = useState<IFilterParams | null>(null);
  const { data: savedCards, isLoading } = useGetUserSavedCards();
  const { push } = useRouter();

  return (
    <main className="grow overflow-hidden 
      grid grid-cols-12 text-black bg-gray-10">
      <LoadedContentStateController
        isEmpty={savedCards && !savedCards.length}
        emptyFallbackComponent={
          <div className="col-span-12 w-[670px] flex items-center bg-white
          flex-col gap-4 justify-center text-center rounded-3xl py-12 px-10">
            <Heading text="You don’t have any saved cards yet." font="normal" />
            <Heading4 
              text="Explore our community 🌏" 
              font="medium" 
              classes="mb-2 text-gray-80" 
            />
            <PrimaryButton 
              text="Continue" 
              onClick={() => push(Routes.TRIPS)}  
            />
          </div>
        }
        isLoading={isLoading}
        loadingFallbackComponent={
          <div className="col-span-12 flex items-center justify-center">
            <Loader />
          </div>
        }
      >
        <div className="col-span-3 overflow-y-scroll">
          <FilterForm type="Saved" setFilterParams={setFilterParams} />
        </div>

        <div className="col-span-9 overflow-y-scroll">
          <SavedCardsSection filterParams={filterParams} />
        </div>
      </LoadedContentStateController>
    </main>
  );
};

export default SavedPage;