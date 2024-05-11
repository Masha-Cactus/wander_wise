'use client';

import { Gallery, FilterForm } from "@/src/components/organisms";
import { useSearchCards } from "@/src/queries";
import { ISearchCard } from "@/src/services";
import { memo, useState } from "react";

type Props = {};

const TripsPage: React.FC<Props> = ({}) => {
  const [filterParams, setFilterParams] 
  = useState<ISearchCard>({} as ISearchCard);
  const [page, setPage] = useState(0);

  //   const { data: cards } = useSearchCards(page, filterParams);

  return (
    <main className="grid grid-cols-12 grid-rows-3 text-black bg-gray10 gap-5">
      <div className="col-span-3 row-span-3">
        <FilterForm setFilterParams={setFilterParams} />
      </div>

      <div
        className="flex items-center justify-center gap-6 
    col-start-4 col-span-9"
      >
        {cards && (
          <Gallery cards={cards} />
        )}
      </div>
    </main>
  );
};

export default memo(TripsPage);
