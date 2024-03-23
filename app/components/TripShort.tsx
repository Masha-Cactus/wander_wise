import Image from "next/image";
import { TripShortType } from "../types/TripType";
import Link from "next/link";

type Props = {
  card: TripShortType;
};

export const TripShort: React.FC<Props> = ({ card }) => {
  return (
    <div className="flex flex-col gap-2 border-2 border-red-800 p-4">
      <Link href={`/trips/${card.id}`} className="">
        <Image src={card.image} alt={card.name} width={200} height={200} />
        <h2>{card.name}</h2>
      </Link>
      <div className="flex gap-2 justify-between">
        <input type="checkbox" />
        <p>{card.author}</p>
      </div>
    </div>
    // <article className="flex flex-col gap-2 border-2 border-red-800 p-4">
    //   <div className="">
    //     <Image 
    //       src={card.image} 
    //       alt={card.name} 
    //       width={200} 
    //       height={200} 
    //     />
    //     <h2>{card.name}</h2>
    //   </div>
    //   <div className="flex gap-2 justify-between">
    //     <input type="checkbox" />
    //     <p>{card.author}</p>
    //   </div>
    // </article>
  );
};