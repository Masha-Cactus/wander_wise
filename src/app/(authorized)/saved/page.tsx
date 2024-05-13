import { FilterForm } from "@/src/components/organisms";
import { SavedCardsSection } from "@/src/components/organisms";
import { memo } from "react";

const Page = () => {
  return (
    <main className="grid grid-cols-12 grid-rows-3 text-black bg-gray10 gap-5">
      <div className="col-span-3 row-span-3">
        <FilterForm />
      </div>

      <div
        className="flex items-center justify-center gap-6 
    col-start-4 col-span-9"
      >
        <SavedCardsSection />
      </div>
    </main>
  );
};

export default memo(Page);