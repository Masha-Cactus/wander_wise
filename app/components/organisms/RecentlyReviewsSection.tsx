import { PrimaryBtn, Review } from "@/app/components/moleculs";
import { useUser } from "@/app/store/user";

const RecentlyLikedSection: React.FC = () => {
  const { user } = useUser();

  return (
    <div
      className="bg-white p-6 rounded-2xl flex flex-col gap-2 
 h-max"
    >
      <p className="text-2xl font-semibold">
        Reviews you&apos;ve recently added
      </p>
      {user && user.reviews.length > 0 ? (
        <div className="">
          {user.reviews.map((review) => (
            <Review key={review.reviewID} review={review} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <p className="text-xl font-normal">
            You don&apos;t yet have cards where you left reviews. Wanna find
            some?
          </p>
          <PrimaryBtn text="Explore" onClick={() => {}} classes="w-1/6" />
        </div>
      )}
    </div>
  );
};

export default RecentlyLikedSection;
