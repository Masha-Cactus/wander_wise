"use client";

import { memo, useEffect } from "react";
import { BackButton } from "@/src/components/moleculs";
import { TripLongCard, ReviewsList } from "@/src/components/organisms";
import { useParams } from "next/navigation";
import { useGetCardDetails } from "@/src/queries";
import { useNormalizedError } from "@/src/hooks";
import { ErrorText } from "@/src/components/atoms";

const TripPage = () => {
  const { id } = useParams();
  const { data: card, error } = useGetCardDetails(+id);
  const [errorMessage, setErrorMessage] = useNormalizedError();

  useEffect(() => {
    if (error) {
      setErrorMessage(error);
    }
  }, [error]);

  return (
    <main className="grow bg-gray10">
      <div className="mx-10 my-10 flex flex-col gap-8">
        <BackButton />

        {card ? (
          <>
            <TripLongCard card={card} />
            <ReviewsList reviews={card?.comments}/>
          </>
        ) : (
          <>
            {error && <ErrorText errorText={errorMessage} />}
          </>
        )}
        
      </div>
    </main>
  );
};

export default memo(TripPage);
