"use client";

import { memo } from "react";
import { TripMCard } from "@/src/components/organisms";
import { ICard } from "@/src/services";

interface GalleryProps {
  cards: ICard[];
}

const Gallery: React.FC<GalleryProps> = ({ cards }) => {
  return (
    <section
      className="col-span-3 col-start-2 row-start-2 
      grid w-full auto-rows-min grid-cols-[repeat(auto-fill,325px)]  
      justify-center gap-x-5 gap-y-6"
    >
      {cards.map((card) => (
        <TripMCard key={card.id} card={card} />
      ))}
    </section>
  );
};

export default memo(Gallery);
