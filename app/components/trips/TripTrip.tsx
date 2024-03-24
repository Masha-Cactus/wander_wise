'use client';

import { TripLongType } from "@/app/types/TripType";
import { useTripModal } from "../shared/TripModal";
import { useEffect } from "react";

export const TripTrip = ({ card }: { card: TripLongType }) => {
  const { TripModal, setShowTripModal } = useTripModal(card);

  useEffect(() => {
    setShowTripModal(true);
  }, [setShowTripModal, card]);

  return (
    <TripModal />
  );
};