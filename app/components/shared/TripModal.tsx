import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";
import Modal from "../shared/Modal";
import { TripLongType } from "@/app/types/TripType";
import { TripLong } from "./TripLong";

const TripModal = ({
  showTripModal,
  setShowTripModal,
  card,
}: {
  showTripModal: boolean;
  setShowTripModal: Dispatch<SetStateAction<boolean>>;
  card: TripLongType;
}) => {

  return (
    <Modal showModal={showTripModal} setShowModal={setShowTripModal}>
      <div className="w-full overflow-hidden shadow-xl md:max-w-md 
      md:rounded-2xl md:border md:border-gray-200">
        <div className="flex flex-col items-center justify-center space-y-3 
        border-b border-gray-200 bg-black px-4 py-6 pt-8 text-center md:px-16">
          <TripLong card={card} />
        </div>
      </div>
    </Modal>
  );
};

export function useTripModal(card: TripLongType) {
  const [showTripModal, setShowTripModal] = useState(false);

  const TripModalCallback = useCallback(() => {
    return (
      <TripModal
        card={card}
        showTripModal={showTripModal}
        setShowTripModal={setShowTripModal}
      />
    );
  }, [showTripModal, setShowTripModal, card]);

  return useMemo(
    () => ({ setShowTripModal, TripModal: TripModalCallback }),
    [setShowTripModal, TripModalCallback],
  );
}