import { Routes } from "@/src/lib/constants";
import { ICard } from "@/src/services";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import { TextMedium } from "@/src/components//atoms";

type Props = {
  card: ICard;
};

const TripShortCard: React.FC<Props> = ({ card }) => {
  return (
    <Link href={Routes.TRIP(card.id)} className="relative h-40 w-60">
      <Image
        src={card.imageLinks[0]}
        alt={card.name}
        width={235}
        height={160}
        className="object-cover rounded-2xl"
      />

      <div className="absolute inset-x-2 bottom-3 
          py-2 px-6 bg-gray80 rounded-2xl">
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
