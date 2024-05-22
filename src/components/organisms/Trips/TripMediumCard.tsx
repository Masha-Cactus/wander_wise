'use client';

import Image from "next/image";
import Link from "next/link";

import { Divider, Icons, Heading5, TextBase } from "@/src/components/atoms";
import { 
  LikeButton, 
  SaveButton, 
  IconButton, 
  PrimaryButton 
} from "@/src/components/moleculs";
import { ICard } from "@/src/services";
import { memo, useState } from "react";
import {
  AddCardToCollectionModal,
  RemoveTripFromCollectionModal
} from "@/src/components/organisms";
import { useParams, usePathname } from "next/navigation";

type Props = {
  card: ICard;
};

const classes = "bg-gray80 text-white rounded-full";

const TripMediumCard: React.FC<Props> = ({ card }) => {
  const { id: collectionId } = useParams();
  const [isAddToCollectionModal, setIsAddToCollectionModal] = useState(false);
  const [isRemoveFromCollectionModal, setIsRemoveFromCollectionModal] 
  = useState(false);

  const pathname = usePathname();
  const isCardInCollectionPage = !!collectionId;
  const isCardInSavedPage = pathname.startsWith('/saved') 
    && !isCardInCollectionPage;

  return (
    <article
      className="flex flex-col gap-4 justify-between items-center 
      rounded-3xl bg-white p-4 w-[325px]"
    >
      <Link href={`/trips/${card.id}`} className="w-full pb-[68%] relative">
        <Image
          src={card.imageLinks[0]}
          alt={card.name}
          fill
          style={{ 
            objectFit: 'cover',
            borderRadius: '28px',
            cursor: 'pointer', 
          }}
        />
      </Link>
      <Link href={`/trips/${card.id}`} className="w-full flex flex-col gap-4">
        <div className="w-full flex gap-2 justify-between">
          <LikeButton
            cardId={card.id}
            cardLikes={card.likes}
            classes={classes}
          />

          <IconButton 
            icon={<Icons.share />} 
            text="Share" 
            classes={classes} 
            size="small" 
          />

          <IconButton 
            icon={<Icons.report />} 
            text="Report" 
            classes={classes}
            size="small"
          />

          <IconButton
            icon={<Icons.user />}
            text={card.author === "AI" ? "AI" : "User"}
            classes={classes}
            size="small"
          />
        </div>
        <Divider classes="w-full h-px" />

        <Heading5 text={card.name} font="medium" />
        <TextBase text={card.whereIs} font="normal" />
      </Link>

      {isCardInSavedPage ? (
        <>
          <PrimaryButton 
            text="Add to the collection" 
            type="button"
            onClick={() => setIsAddToCollectionModal(true)}
          />

          {isAddToCollectionModal && (
            <AddCardToCollectionModal
              card={card}
              onClose={() => setIsAddToCollectionModal(false)}
            />
          )}
        </>
      ) : (
        <>
          {isCardInCollectionPage ? (
            <>
              <PrimaryButton 
                text="Remove from the collection" 
                type="button"
                onClick={() => setIsRemoveFromCollectionModal(true)}
                classes="bg-gray30 text-gray70"
              />
          
              {isRemoveFromCollectionModal && (
                <RemoveTripFromCollectionModal
                  trip={card}
                  collectionId={+collectionId}
                  onClose={() => setIsRemoveFromCollectionModal(false)}
                />
              )}
            </>
          ) : (
            <SaveButton cardId={card.id} />
          )}
        </>
      )}
    </article>
  );
};

export default memo(TripMediumCard);
