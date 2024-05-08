import { PrimaryBtn } from "../moleculs";
import TripShort from "./Trips/TripShort";
// import { useUser } from "@/src/store/user";
import { useUserCollections } from "@/src/queries/user.queries";

const RecentlyLikedSection: React.FC = () => {
//   const { user } = useUser();
  const { data: collections } = useUserCollections();
  const likedCards = collections?.find(collection => 
    collection.name === 'Liked cards')?.cardWithoutDistanceDtos;

  return (
    <div
      className="bg-white p-6 rounded-2xl flex flex-col gap-2 
 h-max"
    >
      <p className="text-2xl font-semibold">Cards you&apos;ve recently liked</p>
      {likedCards && likedCards.length > 0 ? (
        <div className="">
          {likedCards.map((trip) => (
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
