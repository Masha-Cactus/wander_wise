'use client';

import { useGetSavedCards } from "@/src/hooks";
import { useSaveCard } from "@/src/queries";
import { PrimaryButton } from "@/src/components/moleculs";
import { memo } from "react";
import { useUser } from "@/src/store/user";

type Props = {
  cardId: number,
};

const SaveButton: React.FC<Props> = ({ cardId }) => {
  const { user } = useUser();
  const { mutate: save } = useSaveCard();

  const savedCards = useGetSavedCards();
  const isCardSavedByUser = savedCards?.some(likedCard => 
    likedCard.id === cardId);

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