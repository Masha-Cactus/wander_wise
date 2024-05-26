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
import CreateReportModal from "../Modals/CreateReportModal";
import { useUser } from "@/src/store/user";

type Props = {
  card: ICard;
};

const classes = "bg-gray80 text-white rounded-full";

const TripMediumCard: React.FC<Props> = ({ card }) => {
  const { user } = useUser();
  const { id: collectionId } = useParams();
  const [isAddToCollectionModal, setIsAddToCollectionModal] = useState(false);
  const [isRemoveFromCollectionModal, setIsRemoveFromCollectionModal] 
  = useState(false);
  const [isReportCardModal, setIsReportCardModal] = useState(false);

  const pathname = usePathname();
  const isCardInCollectionPage = !!collectionId;
  const isCardInSavedPage = pathname.startsWith('/saved') 
    && !isCardInCollectionPage;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const handleImageError = () => {
    if (currentImageIndex + 1 < card.imageLinks.length) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  return (
    <article
      className="flex flex-col gap-4 items-center 
      rounded-3xl bg-white p-4 w-[325px]"
    >
      <Link href={`/trips/${card.id}`} className="w-full pb-[68%] relative">
        <Image
          src={card.imageLinks[currentImageIndex]}
          alt={card.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
          style={{ 
            objectFit: 'cover',
            borderRadius: '28px',
            cursor: 'pointer', 
          }}
          onError={handleImageError}
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
            onClick={() => setIsReportCardModal(true)}
            disabled={!user}
          />

          <IconButton
            icon={card.author === "AI" ? <Icons.user /> : <Icons.jpt />}
            text={card.author === "AI" ? "AI" : "User"}
            classes={classes}
            size="small"
          />
        </div>
        <Divider classes="w-full h-px" />

        <Heading5 text={card.name} font="medium" classes="grow" />
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

      {isReportCardModal && (
        <CreateReportModal 
          type="Card" 
          onClose={() => setIsReportCardModal(false)} 
        />
      )}
    </article>
  );
};

export default memo(TripMediumCard);
