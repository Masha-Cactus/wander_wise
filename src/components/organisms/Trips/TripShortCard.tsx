import { Routes } from "@/src/lib/constants";
import { ICard } from "@/src/services";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import { TextMedium } from "@/src/components/atoms";
import { TripImage } from "@/src/components/moleculs";

type Props = {
  card: ICard;
};

const TripShortCard: React.FC<Props> = ({ card }) => {
  return (
    <Link 
      href={Routes.TRIP(card.id)} 
      className="relative h-40 w-60 rounded-2xl overflow-hidden"
    >
      <TripImage 
        imageLinks={card.imageLinks}
        alt={card.name}
        sizes="240px"
      />

      <div className="absolute inset-x-2 bottom-3 
          py-2 px-6 bg-gray80">
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
