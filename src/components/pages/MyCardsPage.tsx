'use client';

import { ISearchCard } from "@/src/services";
import { useState } from "react";
import { FilterForm, CreatedCardsSection } from "../organisms";

const MyCardsPage = () => {
  const [filterParams, setFilterParams] = useState<ISearchCard | null>(null);

  return (
    <main className="grid grid-cols-12 grid-rows-3 text-black bg-gray10 gap-5">
      <div className="col-span-3 row-span-3">
        <FilterForm setFilterParams={setFilterParams} />
      </div>

      <div
        className="flex items-center justify-center gap-6 
  col-start-4 col-span-9 row-span-3"
      >
        <CreatedCardsSection />
      </div>
    </main>
  );
};

export default MyCardsPage;