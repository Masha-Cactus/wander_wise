import { PrimaryBtn } from "../moleculs";
import TripShort from "./Trips/TripShort";
import { useUser } from "@/app/store/user";


const RecentlyLikedSection: React.FC = () => {
  const { user } = useUser();

  return (
    <div
      className="bg-white p-6 rounded-2xl flex flex-col gap-2 
 h-max"
    >
      <p className="text-2xl font-semibold">Cards you&apos;ve recently liked</p>
      {user && user.liked.length > 0 ? (
        <div className="">
          {user.liked.map((trip) => (
            <TripShort key={trip.id} card={trip} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <p className="text-xl font-normal text-gray80">
            You don&apos;t have any liked cards yet. Wanna find some?
          </p>
          <PrimaryBtn text="Explore" onClick={() => {}} classes="w-1/6" />
        </div>
      )}
    </div>
  );
};

export default RecentlyLikedSection;
