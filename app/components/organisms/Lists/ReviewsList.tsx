"use client";

import { ReviewType } from "@/app/types/ReviewType";
import { Review } from "@/app/components/moleculs";
import { Divider } from "@/app/components/atoms";

type Props = {
  rewiews: ReviewType[];
};

const ReviewsList: React.FC<Props> = ({ rewiews }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="w-full flex justify-between">
        <div className="flex justify-between gap-2 items-end">
          <h2 className="text-3xl font-bold">Reviews</h2>
          <p className="text-gray70 text-2xl">{`(${rewiews.length})`}</p>
        </div>

        <p className="text-xl underline">Post review</p>
      </div>

      <Divider classes="h-px w-full bg-gray30" />

      <div className="grid grid-cols-3 gap-4">
        {rewiews.map((review) => (
          <Review review={review} key={review.reviewID} />
        ))}
      </div>
    </div>
  );
};

export default ReviewsList;
