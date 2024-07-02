'use client';

import { memo, useCallback, useMemo, useRef } from "react";
import { 
  useGetUserCollections,
  useLikeCard, 
  useRemoveLikeFromCard 
} from "@/src/queries";
import { Icons } from "@/src/components/atoms";
import { IconButton } from "@/src/components/molecules";
import { useUser } from "@/src/store/user";
import { selectLikedCards } from "@/src/lib/collectionSelectors";
import { ICollection } from "@/src/services";

interface LikeButtonProps {
  cardLikes: number,
  cardId: number,
  classes: string,
}

const LikeButton: React.FC<LikeButtonProps> 
= ({ cardId, cardLikes, classes }) => {
  const { user } = useUser();
  const { mutate: like } = useLikeCard();
  const { mutate: removeLike } = useRemoveLikeFromCard();
  const likes = useRef(cardLikes);

  const { 
    data: likedCollection, 
  } = useGetUserCollections<ICollection>(selectLikedCards);
  const isCardLikedByUser = useMemo(() => 
    likedCollection?.cardDtos.some(likedCard => likedCard.id === cardId), 
  [likedCollection, cardId]);

  const handleLikeClick = useCallback(() => {
    if (isCardLikedByUser) {
      removeLike(cardId);
      likes.current -= 1;
    } else {
      likes.current +=1;
      like(cardId);
    }
  }, [isCardLikedByUser, cardId]);

  return (
    <IconButton
      icon={isCardLikedByUser ? <Icons.heartFilled /> : <Icons.heart />}
      text={likes.current?.toString()}
      classes={classes}
      onClick={handleLikeClick}
      disabled={!user}
    />
  );
};

export default memo(LikeButton);