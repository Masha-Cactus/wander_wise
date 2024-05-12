import { PrimaryButton } from "@/src/components/moleculs";
import { useUser } from "@/src/store/user";
import { ReviewCard } from "@/src/components/organisms";
import { memo } from "react";
import { Heading2, Heading5 } from "@/src/components/atoms";

const RecentlyLikedSection: React.FC = () => {
  const { user } = useUser();

  return (
    <div
      className="bg-white p-6 rounded-2xl flex flex-col gap-2 
 h-max"
    >
      <Heading2 text="Reviews you've recently added" font="semibold" />

      {user && user.reviews.length > 0 ? (
        <div className="">
          {user.reviews.map((review) => (
            <ReviewCard key={review.reviewID} review={review} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <Heading5
            font="normal"
            text="You don't yet have cards where you left reviews. Wanna find some?"
          />
          <PrimaryButton text="Explore" type="button" classes="w-1/6" />
        </div>
      )}
    </div>
  );
};

export default memo(RecentlyLikedSection);
