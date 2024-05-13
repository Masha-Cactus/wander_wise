'use client';

import { PrimaryButton } from "@/src/components/moleculs";
import { ReviewCard } from "@/src/components/organisms";
import { memo } from "react";
import { Heading3, Heading5 } from "@/src/components/atoms";
import { useGetUserComments } from "@/src/queries";
import { useRouter } from "next/navigation";

const RecentlyLikedSection: React.FC = () => {
  const { push } = useRouter();
  const { data: reviews } = useGetUserComments();

  return (
    <div
      className="bg-white p-6 rounded-2xl flex flex-col gap-2 
 h-max"
    >
      <Heading3 text="Reviews you've recently added" />

      {reviews && reviews?.length > 0 ? (
        <div className="">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <Heading5
            font="normal"
            text="You don't yet have cards where you left reviews. 
              Wanna find some?"
          />
          <PrimaryButton 
            text="Explore" 
            type="button" 
            classes="w-1/6" 
            onClick={() => push('/trips')} 
          />
        </div>
      )}
    </div>
  );
};

export default memo(RecentlyLikedSection);
