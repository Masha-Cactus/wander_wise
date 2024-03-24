'use client';

import { TripLongType, TripShortType } from "../../types/TripType";
import { useTripModal } from "../shared/TripModal";
import { TripShort } from "../shared/TripShort";

type Props = {
  cards: TripShortType[];
  card: TripLongType;
};

const Gallery: React.FC<Props> = ({ cards, card }) => {
  const { TripModal, setShowTripModal } = useTripModal(card);

  return (
    <section className="flex items-center justify-center gap-6 
    col-start-2 col-span-3 row-start-2">
      <TripModal />
      {cards.map((card) => (
        <TripShort
          key={card.id}
          card={card}
          onClick={() => setShowTripModal(true)}
        />
      ))}
    </section>
  );
};

export default Gallery;