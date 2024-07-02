import { TripImage } from "@/src/components/molecules";
import { Heading5, TextBase } from "@/src/components/atoms";
import { ICard } from "@/src/services";

interface TripXSCardProps {
  card: ICard;
}

const TripXSCard: React.FC<TripXSCardProps> = ({ card }) => {
  return (
    <article
      className="flex flex-col items-center justify-between gap-3 
      overflow-hidden rounded-3xl bg-white p-3"
    >
      <div 
        className="relative flex w-full overflow-hidden rounded-2xl pb-[68%]"
      >
        <TripImage 
          imageLinks={card.imageLinks} 
          alt={card.name} 
          sizes="186px"
        />
      </div>

      <div className="flex flex-col gap-1">
        <Heading5 
          text={card.name}  
          font="semibold" 
          classes="line-clamp-2"
        />

        <TextBase 
          text={card.whereIs} 
          font="normal" 
          classes="text-gray-80 line-clamp-2" 
        />
      </div>
    </article>
  );
};

export default TripXSCard;