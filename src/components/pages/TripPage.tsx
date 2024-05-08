import { memo } from "react";
import { BackBtn } from "@/src/components/moleculs";
import { TripLong, ReviewsList } from "@/src/components/organisms";
import { ICard } from "@/src/types/Card";
import { IComment } from "@/src/types/Comment";

type Props = {
  card: ICard;
  reviews: IComment[];
};

const TripPage: React.FC<Props> = ({ card, reviews }) => {
  return (
    <main className="w-full h-full bg-gray10">
      <div className="mx-10 my-10 flex flex-col gap-8">
        <BackBtn />
        <TripLong card={card} />
        <ReviewsList rewiews={reviews}/>
      </div>
    </main>
  );
};

export default memo(TripPage);
