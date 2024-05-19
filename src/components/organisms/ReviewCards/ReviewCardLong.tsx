'use client';

import { getDaysAgo } from "@/src/lib/helpers";
import { IComment } from "@/src/services";
import { memo } from "react";
import { Divider, Icons, TextBase, Heading5 } from "@/src/components/atoms";
import { LinkButton } from "@/src/components/moleculs";
import { useGetCardDetails } from "@/src/queries";
import { Stars } from "@/src/components/organisms";

type Props = {
  review: IComment,
};

const ReviewCardLong: React.FC<Props> = ({ review }) => {
  const { data: card } = useGetCardDetails(review.cardId);
  const stars = new Array(5).fill(0).fill(1, 0, review.stars);

  return (
    <article className="py-6 flex flex-col gap-9 w-full">
      <div className="flex justify-between items-center w-full">
        <div>
          <Heading5 text={card?.name || ''} font="semibold" />
          <Stars stars={stars} />
        </div>
        <div className="flex gap-6 items-center">
          <TextBase 
            text={getDaysAgo(review.timeStamp) || 'recently'} 
            font="normal" 
            classes="text-gray50" 
          />
          <Divider classes="w-px h-full" />
          <div className="flex items-center gap-2">
            <Icons.follow className="w-6 h-6" />
            <LinkButton path={`/trips/${review.cardId}`} text="Go to card" />
          </div>
          
        </div>
      </div>
      <TextBase text={review.text} font="normal" classes="text-gray80" />
    </article>
  );
};

export default memo(ReviewCardLong);