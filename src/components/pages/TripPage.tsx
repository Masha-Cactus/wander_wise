"use client";

import { memo, useEffect } from "react";
import { BackButton } from "@/src/components/molecules";
import { TripLongCard, ReviewsList } from "@/src/components/organisms";
import { useParams, useRouter } from "next/navigation";
import { useGetCardDetails } from "@/src/queries";
import { Routes } from "@/src/lib/constants";

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
      <div className="mx-10 my-10 flex flex-col gap-8">
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
