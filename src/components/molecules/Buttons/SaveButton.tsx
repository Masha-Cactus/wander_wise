'use client';

import { memo, useMemo } from "react";
import { 
  useGetUserCollections,
  useRemoveCardFromSaved, 
  useSaveCard 
} from "@/src/queries";
import { PrimaryButton } from "@/src/components/molecules";
import { useUser } from "@/src/store/user";
import { selectSavedCards } from "@/src/lib/collectionSelectors";
import { ICollection } from "@/src/services";

interface SaveButtonProps {
  cardId: number,
}

const SaveButton: React.FC<SaveButtonProps> = ({ cardId }) => {
  const { user } = useUser();
  const { mutate: save } = useSaveCard();
  const { mutate: removeFromSaved } = useRemoveCardFromSaved();

  const { data: savedCollection } = useGetUserCollections<ICollection>(selectSavedCards);
  const isCardSavedByUser = useMemo(() => 
    savedCollection?.cardDtos.some(savedCard => savedCard.id === cardId), 
  [savedCollection, cardId]);
  
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