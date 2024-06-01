'use client';

import { useGetUserSavedCards, useSaveCard } from "@/src/queries";
import { PrimaryButton } from "@/src/components/moleculs";
import { memo } from "react";
import { useUser } from "@/src/store/user";

type Props = {
  cardId: number,
};

const SaveButton: React.FC<Props> = ({ cardId }) => {
  const { user } = useUser();
  const { mutate: save } = useSaveCard();

  const { data: savedCards } = useGetUserSavedCards();
  const isCardSavedByUser = savedCards?.some(savedCard => 
    savedCard.id === cardId);

  return (
    <PrimaryButton
      text={isCardSavedByUser ? 'Saved' : 'Save'}
      onClick={() => save(cardId)}
      type="button"
      disabled={isCardSavedByUser || !user}
    />
  );
};

export default memo(SaveButton);