import Image from "next/image";
import { TripLongType } from "../types/TripType";
import Link from "next/link";

type Props = {
  card: TripLongType;
};

export const TripLong: React.FC<Props> = ({ card }) => {

  return (
    <article className="flex flex-col gap-2 border-2 border-red-800 p-4">
      <Link href="/trips">
        X
      </Link>
      <Image src={card.image} alt={card.name} width={200} height={200} />
      <h2>{card.name}</h2>
      <p>{card.description}</p>
      <div className="flex gap-2 justify-between">
        <input type="checkbox" />
        <p>{card.author}</p>
        <p>{card.budget}</p>
        <p>{card.distance}</p>
      </div>
    </article>
  );
};