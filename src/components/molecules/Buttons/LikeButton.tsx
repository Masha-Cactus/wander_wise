'use client';

import { 
  useGetUserLikedCards, 
  useLikeCard, 
  useRemoveLikeFromCard 
} from "@/src/queries";
import { memo, useMemo, useRef } from "react";
import { Icons } from "@/src/components/atoms";
import { IconButton } from "@/src/components/molecules";
import { useUser } from "@/src/store/user";

type Props = {
  cardLikes: number,
  cardId: number,
  classes: string,
};

const LikeButton: React.FC<Props> = ({ cardId, cardLikes, classes}) => {
  const { user } = useUser();
  const { mutate: like } = useLikeCard();
  const { mutate: removeLike } = useRemoveLikeFromCard();
  const likes = useRef(cardLikes);

  const { data: likedCards } = useGetUserLikedCards();
  const isCardLikedByUser = useMemo(() => 
    likedCards?.some(likedCard => likedCard.id === cardId), 
  [likedCards, cardId]);

  const handleLikeClick = () => {
    if (isCardLikedByUser) {
      removeLike(cardId);
      likes.current -= 1;
    } else {
      likes.current +=1;
      like(cardId);
    }
  };

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