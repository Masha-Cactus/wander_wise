import { memo } from "react";
import Link from "next/link";
import { Routes } from "@/src/lib/constants";
import { ICard } from "@/src/services";
import { TextMedium } from "@/src/components/atoms";
import { TripImage } from "@/src/components/molecules";

interface TripShortCardProps {
  card: ICard;
}

const TripShortCard: React.FC<TripShortCardProps> = ({ card }) => {
  return (
    <Link 
      href={Routes.TRIP(card.id)} 
      className="relative h-40 w-60 overflow-hidden rounded-2xl shrink-0"
    >
      <TripImage 
        imageLinks={card.imageLinks}
        alt={card.name}
        sizes="240px"
      />

      <div 
        className="absolute inset-x-2 bottom-3 
        rounded-full bg-gray-80 px-6 py-2"
      >
        <TextMedium 
          text={card.name} 
          font="semibold" 
          classes="w-full truncate text-white" 
        />
      </div>
    </Link>
  );
};

export default memo(TripShortCard);
