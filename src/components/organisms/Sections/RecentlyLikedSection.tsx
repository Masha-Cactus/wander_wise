'use client';

import { PrimaryButton } from "@/src/components/moleculs";
import { TripShortCard } from "@/src/components/organisms";
import { memo } from "react";
import { Heading5, Heading3 } from "@/src/components/atoms";
import { useRouter } from "next/navigation";
import { useGetLikedCards } from "@/src/hooks";
import { Routes } from "@/src/lib/constants";

const RecentlyLikedSection: React.FC = () => {
  const { push } = useRouter();
  const likedCards = useGetLikedCards();

  return (
    <section
      className="bg-white py-12 px-10 rounded-2xl flex flex-col gap-2 
        w-full"
    >
      <Heading3 text="Cards you&apos;ve recently liked" />
      {likedCards && likedCards.length > 0 ? (
        <div className="mt-4 w-full flex gap-5 items-center overflow-x-scroll">
          {likedCards.map((trip) => (
            <TripShortCard key={trip.id} card={trip} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <Heading5 font="normal" classes="text-gray80 mb-2"
            text="You don&apos;t have any liked cards yet. Wanna find some?" />
          <PrimaryButton 
            text="Explore" 
            classes="w-44" 
            type="button" 
            onClick={() => push(Routes.TRIPS)}
          />
        </div>
      )}
    </section>
  );
};

export default memo(RecentlyLikedSection);
