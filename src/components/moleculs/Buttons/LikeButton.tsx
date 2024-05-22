'use client';

import { useGetLikedCards } from "@/src/hooks";
import { useLikeCard, useRemoveLikeFromCard } from "@/src/queries";
import { memo } from "react";
import { Icons } from "@/src/components/atoms";
import { IconButton } from "@/src/components/moleculs";

type Props = {
  cardLikes: number,
  cardId: number,
  classes: string,
};

const LikeButton: React.FC<Props> = ({ cardId, cardLikes, classes}) => {
  const { mutate: like } = useLikeCard();
  const { mutate: removeLike } = useRemoveLikeFromCard();

  const likedCards = useGetLikedCards();
  const isCardLikedByUser = likedCards?.some(likedCard => 
    likedCard.id === cardId);

  const handleLikeClick = (id: number) => {
    isCardLikedByUser
      ? removeLike(id)
      : like(id);
  };

  return (
    <IconButton
      icon={isCardLikedByUser ? <Icons.heartFilled /> : <Icons.heart />}
      text={cardLikes.toString()}
      classes={classes}
      onClick={() => handleLikeClick(cardId)}
    />
  );
};

export default memo(LikeButton);