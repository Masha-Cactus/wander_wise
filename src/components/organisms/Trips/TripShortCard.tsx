import { ICard } from "@/src/services";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

type Props = {
  card: ICard;
  // onClick: () => void;
};

const TripShortCard: React.FC<Props> = ({ card }) => {
  return (
    <div className="flex flex-col bg-white p-4">
      <Link href={`/trips/${card.id}`} className="">
        <Image
          src={card.imageLinks[0]}
          alt={card.name}
          width={200}
          height={200}
        />
        <h2>{card.name}</h2>
      </Link>
    </div>
  );
};

export default memo(TripShortCard);
