'use client';

import { useGetCreatedCards } from "@/src/hooks";
import { IFilterParams } from "@/src/services";
import { useState } from "react";
import { FilterForm, CreatedCardsSection } from "@/src/components/organisms";
import { Heading, Heading4 } from "@/src/components/atoms";
import { PrimaryButton } from "@/src/components/moleculs";
import { useRouter } from "next/navigation";
import { Routes } from "@/src/lib/constants";

const MyCardsPage = () => {
  const [filterParams, setFilterParams] = useState<IFilterParams | null>(null);
  const createdCards = useGetCreatedCards();
  const { push } = useRouter();

  return (
    <main className="grow overflow-hidden
      grid grid-cols-12 text-black bg-gray10">

      {createdCards && createdCards.length ? (
        <>
          <div className="col-span-3 overflow-y-scroll">
            <FilterForm type="Created" setFilterParams={setFilterParams} />
          </div>

          <div className="col-span-9 overflow-y-scroll">
            <CreatedCardsSection filterParams={filterParams} />
          </div>
        </>
      ) : (
        <div className="col-span-12 flex items-center
          flex-col gap-8 justify-center text-center">
          <Heading text="You don’t have any created cards yet." font="normal" />
          <Heading4 text="Create your first card now! 🌏" font="medium" />
          <PrimaryButton 
            text="Create" 
            onClick={() => push(Routes.MY_CARDS.CREATE)}
            classes="w-1/3"
          />
        </div>
      )}
      
    </main>
  );
};

export default MyCardsPage;