'use client';

import { Gallery, FilterForm } from "@/src/components/organisms";
import { useSearchCards } from "@/src/queries";
import { ISearchCard } from "@/src/services";
import { memo, useState } from "react";
import Pagination from "../organisms/Pagination";

type Props = {};

const TripsPage: React.FC<Props> = ({}) => {
  const [filterParams, setFilterParams] = useState<ISearchCard | null>(null);
  const [page, setPage] = useState(0);

  const { data: cards, isPlaceholderData } = useSearchCards(page, filterParams);

  return (
    <main className="grid grid-cols-12 grid-rows-3 text-black bg-gray10 gap-5">
      <div className="col-span-3 row-span-3">
        <FilterForm setFilterParams={setFilterParams} />
      </div>

      <div
        className="flex flex-col justify-between items-center gap-6 
    col-start-4 col-span-9"
      >
        {cards && (
          <Gallery cards={cards} />
        )}

        <Pagination 
          page={page} 
          setPage={setPage} 
          isPlaceholderData={isPlaceholderData} 
        />
      </div>
    </main>
  );
};

export default memo(TripsPage);
