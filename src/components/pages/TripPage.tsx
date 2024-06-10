"use client";

import { memo, useEffect } from "react";
import { BackButton } from "@/src/components/molecules";
import { TripLongCard, ReviewsList } from "@/src/components/organisms";
import { useParams, useRouter } from "next/navigation";
import { useGetCardDetails } from "@/src/queries";
import { Routes } from "@/src/lib/constants";
import { Divider } from "@/src/components/atoms";

const TripPage = () => {
  const { id } = useParams();
  const { push } = useRouter();
  const { data: card, error } = useGetCardDetails(+id);

  useEffect(() => {
    if (isNaN(+id) || error) {
      push(Routes.NOT_FOUND);
    }
  }, [id, error]);

  return (
    <main className="grow bg-gray-10">
      <Divider />
      <div className="w-full h-full px-10 py-10 flex flex-col gap-8">
        <BackButton />

        {card && (
          <>
            <TripLongCard card={card} />
            <ReviewsList reviews={card?.comments}/>
          </>
        )}
      </div>
    </main>
  );
};

export default memo(TripPage);
