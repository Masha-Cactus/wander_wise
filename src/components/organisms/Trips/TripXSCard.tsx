import { memo } from "react";
import { TripImage } from "@/src/components/molecules";
import { Heading5, TextBase } from "@/src/components/atoms";
import { ICard } from "@/src/services";

type Props = {
  card: ICard;
};

const TripXSCard: React.FC<Props> = ({ card }) => {
  return (
    <article
      className="flex flex-col gap-3 items-center justify-between 
      rounded-3xl overflow-hidden bg-white p-3"
    >
      <div 
        className="relative flex w-full pb-[68%] rounded-2xl overflow-hidden"
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
        />

        <TextBase text={card.whereIs} font="normal" classes="text-gray-80" />
      </div>
    </article>
  );
};

export default memo(TripXSCard);