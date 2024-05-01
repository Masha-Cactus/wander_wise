import { memo } from "react";
import { TripLongType } from "@/app/types/TripType";
import { BackBtn } from "@/app/components/moleculs";
import { ReviewType } from "@/app/types/ReviewType";
import { TripLong, ReviewsList } from "@/app/components/organisms";

type Props = {
  card: TripLongType;
  reviews: ReviewType[];
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
