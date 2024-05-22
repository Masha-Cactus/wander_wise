'use client';

import { useState } from "react";
import { FilterForm, SavedCardsSection } from "../organisms";
import { IFilterParams } from "@/src/services";

const SavedPage = () => {
  const [filterParams, setFilterParams] = useState<IFilterParams | null>(null);

  return (
    <main className="grid grid-cols-12 grid-rows-3 text-black bg-gray10 gap-5">
      <div className="col-span-3 row-span-3">
        <FilterForm type="Created" setFilterParams={setFilterParams} />
      </div>

      <div
        className="flex items-center justify-center gap-6 
  col-start-4 col-span-9 row-span-3"
      >
        <SavedCardsSection filterParams={filterParams} />
      </div>
    </main>
  );
};

export default SavedPage;