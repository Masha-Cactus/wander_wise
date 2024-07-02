'use client';

import { useRouter } from "next/navigation";
import { PrimaryButton } from "@/src/components/molecules";
import { TripSCard } from "@/src/components/organisms";
import { Heading5, Heading3 } from "@/src/components/atoms";
import { Routes } from "@/src/lib/constants";
import { useGetUserCollections } from "@/src/queries";
import { selectLikedCards } from "@/src/lib/collectionSelectors";
import { ICollection } from "@/src/services";

const RecentlyLikedSection: React.FC = () => {
  const { push } = useRouter();
  const { 
    data: likedCollection, 
  } = useGetUserCollections<ICollection>(selectLikedCards);

  return (
    <section
      className="flex w-full flex-col gap-2 rounded-2xl bg-white px-10 py-12"
    >
      <Heading3 text="Cards you&apos;ve recently liked" />
      {!!likedCollection?.cardDtos.length ? (
        <div className="mt-4 flex w-full items-center gap-5 overflow-x-scroll">
          {likedCollection.cardDtos.map((card) => (
            <TripSCard key={card.id} card={card} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <Heading5 font="normal" classes="text-gray-80"
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

export default RecentlyLikedSection;
