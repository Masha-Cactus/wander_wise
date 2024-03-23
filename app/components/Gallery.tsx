'use client';

import { TripLongType, TripShortType } from "../types/TripType";
import { TripShort } from "./TripShort";

type Props = {
  cards: TripShortType[];
  card: TripLongType;
};

const Gallery: React.FC<Props> = ({ cards }) => {

  return (
    <section className="flex items-center justify-center gap-6 
    col-start-2 col-span-3 row-start-2">
      {cards.map((card) => (
        <TripShort key={card.id} card={card} />
      ))}
    </section>
  );
};

export default Gallery;