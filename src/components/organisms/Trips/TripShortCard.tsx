import { ICard } from "@/src/services";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import { TextMedium } from "../../atoms";

type Props = {
  card: ICard;
  // onClick: () => void;
};

const TripShortCard: React.FC<Props> = ({ card }) => {
  return (
    <Link href={`/trips/${card.id}`} className="relative h-40 w-60">
      <Image
        src={card.imageLinks[0]}
        alt={card.name}
        width={0}
        height={0}
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover',
          borderRadius: '20px', 
        }}
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
