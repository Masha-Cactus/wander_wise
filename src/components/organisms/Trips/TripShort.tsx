import Image from "next/image";
import Link from "next/link";
// import { TripShortType } from "../../../types/TripType";

type Props = {
  card;
  // onClick: () => void;
};

const TripShort: React.FC<Props> = ({ card }) => {
  return (
    <div className="flex flex-col bg-white p-4">
      <Link href={`/trips/${card.id}`} className="">
        <Image src={card.image} alt={card.name} width={200} height={200} />
        <h2>{card.name}</h2>
      </Link>
    </div>
  );
};

export default TripShort;