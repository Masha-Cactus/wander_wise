import { memo } from "react";
import { BackButton } from "@/src/components/moleculs";
import { TripLongCard, ReviewsList } from "@/src/components/organisms";
import { ICard, IComment } from "@/src/services";

type Props = {
  card: ICard;
  reviews: IComment[];
};

const TripPage: React.FC<Props> = ({ card, reviews }) => {
  return (
    <main className="w-full h-full bg-gray10">
      <div className="mx-10 my-10 flex flex-col gap-8">
        <BackButton />
        <TripLongCard card={card} />
        <ReviewsList rewiews={reviews}/>
      </div>
    </main>
  );
};

export default memo(TripPage);
