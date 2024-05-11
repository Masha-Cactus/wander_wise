"use client";

import { ReviewCard } from "@/src/components/organisms";
import { Divider } from "@/src/components/atoms";
import { IComment } from "@/src/services";
import { memo } from "react";

type Props = {
  rewiews: IComment[];
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
          <ReviewCard review={review} key={review.id} />
        ))}
      </div>
    </div>
  );
};

export default memo(ReviewsList);
