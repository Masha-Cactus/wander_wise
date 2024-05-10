// import { getCards } from "@/app/services/cards";
import { Gallery, FilterForm } from "@/src/components/organisms";
// import { TripLongType } from "@/app/types/TripType";
import { memo } from "react";

type Props = {};

const Page: React.FC<Props> = async ({}) => {
  const cards = [];

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

export default memo(Page);