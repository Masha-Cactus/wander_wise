"use client";

import { TripMediumCard } from "@/src/components/organisms";
import { ICard } from "@/src/services";
import { memo } from "react";

type Props = {
  cards: ICard[];
};

const Gallery: React.FC<Props> = ({ cards }) => {
  return (
    <section
      className="w-full grid grid-cols-[repeat(auto-fill,300px)] 
      auto-rows-fr justify-center gap-y-6 gap-x-5  
      col-start-2 col-span-3 row-start-2"
    >
      {cards.map((card) => (
        <TripMediumCard key={card.id} card={card} />
      ))}
    </section>
  );
};

export default memo(Gallery);
