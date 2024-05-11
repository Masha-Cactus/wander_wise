import { Gallery, FilterForm } from "@/src/components/organisms";
import { ICard } from "@/src/services";
import { memo } from "react";

type Props = {};

const TripsPage: React.FC<Props> = ({}) => {
  const cards: ICard[] = [];

  return (
    <main className="grid grid-cols-12 grid-rows-3 text-black bg-gray10 gap-5">
      <div className="col-span-3 row-span-3">
        <FilterForm />
      </div>

      <div
        className="flex items-center justify-center gap-6 
    col-start-4 col-span-9"
      >
        <Gallery cards={cards} />
      </div>
    </main>
  );
};

export default memo(TripsPage);
