'use client';

import { PrimaryButton } from "@/src/components/moleculs";
import { ReviewCardLong } from "@/src/components/organisms";
import { memo } from "react";
import { Heading3, Heading5, Divider } from "@/src/components/atoms";
import { useGetUserComments } from "@/src/queries";
import { useRouter } from "next/navigation";
import { Routes } from "@/src/lib/constants";

const RecentlyLikedSection: React.FC = () => {
  const { push } = useRouter();
  const { data: reviews } = useGetUserComments();

  return (
    <section
      className="bg-white py-12 px-10 rounded-2xl flex flex-col"
    >
      <Heading3 text="Reviews you've recently added" classes="mb-6" />

      {reviews && reviews?.length > 0 ? (
        <>
          <Divider />
          {reviews.map((review) => (
            <div key={review.id}>
              <ReviewCardLong review={review} />
              <Divider />
            </div>
          ))}
        </>
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
            classes="w-44" 
            onClick={() => push(Routes.TRIPS)} 
          />
        </div>
      )}
    </section>
  );
};

export default memo(RecentlyLikedSection);
