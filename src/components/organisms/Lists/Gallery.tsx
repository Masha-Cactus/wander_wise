"use client";

import { TripMedium } from "@/src/components/organisms";
import { ICard } from "@/src/types/Card";

type Props = {
  cards: ICard[];
};

const Gallery: React.FC<Props> = ({ cards }) => {
  return (
    <section
      className="flex items-center justify-center gap-6 
    col-start-2 col-span-3 row-start-2"
    >
      {cards.map((card) => (
        <TripMedium key={card.id} card={card} />
      ))}
    </section>
  );
};

export default Gallery;
