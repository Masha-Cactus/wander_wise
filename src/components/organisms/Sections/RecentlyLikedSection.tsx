'use client';

import { PrimaryButton } from "@/src/components/moleculs";
import { TripShortCard } from "@/src/components/organisms";
import { memo } from "react";
import { Heading5, Heading3 } from "@/src/components/atoms";
import { useRouter } from "next/navigation";
import { useGetLikedCards } from "@/src/hooks";

const RecentlyLikedSection: React.FC = () => {
  const { push } = useRouter();
  const likedCards = useGetLikedCards();

  return (
    <section
      className="bg-white p-6 rounded-2xl flex flex-col gap-2 
 h-max"
    >
      <Heading3 text="Cards you&apos;ve recently liked" />
      {likedCards && likedCards.length > 0 ? (
        <div className="">
          {likedCards.map((trip) => (
            <TripShortCard key={trip.id} card={trip} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <Heading5 font="normal" classes="text-gray80"
            text="You don&apos;t have any liked cards yet. Wanna find some?" />
          <PrimaryButton 
            text="Explore" 
            classes="w-1/6" 
            type="button" 
            onClick={() => push('/trips')}
          />
        </div>
      )}
    </section>
  );
};

export default memo(RecentlyLikedSection);
