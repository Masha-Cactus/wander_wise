'use client';

import { IFilterParams } from "@/src/services";
import { useState } from "react";
import { FilterForm, CreatedCardsSection } from "@/src/components/organisms";
import { Heading, Heading4, Loader } from "@/src/components/atoms";
import { 
  PrimaryButton,
  LoadedContentStateController
} from "@/src/components/molecules";
import { useRouter } from "next/navigation";
import { Routes } from "@/src/lib/constants";
import { useGetUserCreatedCards } from "@/src/queries";

const MyCardsPage = () => {
  const [filterParams, setFilterParams] = useState<IFilterParams | null>(null);
  const { data: createdCards, isLoading } = useGetUserCreatedCards();
  const { push } = useRouter();

  return (
    <main className="grow overflow-hidden
      grid grid-cols-12 text-black bg-gray-10">
      <LoadedContentStateController
        isEmpty={createdCards && !createdCards.length}
        emptyFallbackComponent={
          <div className="col-span-12 w-[670px] flex items-center bg-white
          flex-col gap-4 justify-center text-center rounded-3xl py-12 px-10">
            <Heading 
              text="You don’t have any created cards yet." 
              font="normal" 
              classes="mb-2 text-gray-80"
            />
            <Heading4 text="Create your first card now! 🌏" font="medium" />
            <PrimaryButton 
              text="Create" 
              onClick={() => push(Routes.MY_CARDS.CREATE)}
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
          <FilterForm type="Created" setFilterParams={setFilterParams} />
        </div>

        <div className="col-span-9 overflow-y-scroll">
          <CreatedCardsSection filterParams={filterParams} />
        </div>
      </LoadedContentStateController>    
    </main>
  );
};

export default MyCardsPage;