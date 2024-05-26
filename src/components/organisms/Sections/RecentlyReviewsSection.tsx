'use client';

import { PrimaryButton } from "@/src/components/moleculs";
import { ReviewCardLong } from "@/src/components/organisms";
import { memo } from "react";
import { Heading3, Heading5, Divider } from "@/src/components/atoms";
import { useGetUserComments } from "@/src/queries";
import { useRouter } from "next/navigation";

const RecentlyLikedSection: React.FC = () => {
  const { push } = useRouter();
  const { data: reviews } = useGetUserComments();

  return (
    <section
      className="bg-white py-12 px-10 rounded-2xl flex flex-col gap-6"
    >
      <Heading3 text="Reviews you've recently added" />

      {reviews && reviews?.length > 0 ? (
        <>
          <Divider classes="w-full h-px" />
          {reviews.map((review) => (
            <div key={review.id}>
              <ReviewCardLong review={review} />
              <Divider classes="w-full h-px" />
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
            onClick={() => push('/trips')} 
          />
        </div>
      )}
    </section>
  );
};

export default memo(RecentlyLikedSection);
