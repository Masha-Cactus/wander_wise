'use client';

import { 
  useGetUserSavedCards, 
  useRemoveCardFromSaved, 
  useSaveCard 
} from "@/src/queries";
import { PrimaryButton } from "@/src/components/molecules";
import { memo, useMemo } from "react";
import { useUser } from "@/src/store/user";

type Props = {
  cardId: number,
};

const SaveButton: React.FC<Props> = ({ cardId }) => {
  const { user } = useUser();
  const { mutate: save } = useSaveCard();
  const { mutate: removeFromSaved } = useRemoveCardFromSaved();

  const { data: savedCards } = useGetUserSavedCards();
  const isCardSavedByUser = useMemo(() => 
    savedCards?.some(savedCard => savedCard.id === cardId), 
  [savedCards]);
  
  const handleClick = () => {
    isCardSavedByUser
      ? removeFromSaved(cardId)
      : save(cardId);
  };

  return (
    <PrimaryButton
      text={isCardSavedByUser ? 'Remove from saved' : 'Save'}
      onClick={handleClick}
      type="button"
      disabled={!user}
    />
  );
};

export default memo(SaveButton);