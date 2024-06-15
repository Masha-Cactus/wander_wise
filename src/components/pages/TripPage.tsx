"use client";

import { memo, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { LoadedContentStateController } from "@/src/components/molecules";
import { TripLongCard, ReviewsList } from "@/src/components/organisms";
import { useGetCardDetails } from "@/src/queries";
import { Routes } from "@/src/lib/constants";
import { StandardPageLayout } from "@/src/components/templates";

const TripPage = () => {
  const { id } = useParams();
  const { push } = useRouter();
  const { data: card, error, isLoading } = useGetCardDetails(+id);

  useEffect(() => {
    if (isNaN(+id) || error) {
      push(Routes.NOT_FOUND);
    }
  }, [id, error, push]);

  return (
    <StandardPageLayout>
      <LoadedContentStateController
        isLoading={isLoading}
      >
        {card && (
          <>
            <TripLongCard card={card} />
            <ReviewsList reviews={card?.comments}/>
          </>
        )}
      </LoadedContentStateController>
    </StandardPageLayout>
  );
};

export default memo(TripPage);
