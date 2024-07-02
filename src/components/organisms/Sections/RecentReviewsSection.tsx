'use client';

import { useRouter } from "next/navigation";
import { PrimaryButton } from "@/src/components/molecules";
import { ReviewCardLong } from "@/src/components/organisms";
import { Heading3, Heading5, Divider } from "@/src/components/atoms";
import { useGetUserComments } from "@/src/queries";
import { Routes } from "@/src/lib/constants";

const RecentReviewsSection: React.FC = () => {
  const { push } = useRouter();
  const { data: reviews } = useGetUserComments();

  return (
    <section
      className="flex flex-col gap-2 rounded-2xl bg-white px-10 py-12"
    >
      <Heading3 text="Reviews you've recently added" />

      {reviews && reviews?.length > 0 ? (
        <div>
          <Divider classes="mt-4" />
          {reviews.map((review) => (
            <div key={review.id}>
              <ReviewCardLong review={review} />
              <Divider />
            </div>
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
            classes="w-44" 
            onClick={() => push(Routes.TRIPS)} 
          />
        </div>
      )}
    </section>
  );
};

export default RecentReviewsSection;
