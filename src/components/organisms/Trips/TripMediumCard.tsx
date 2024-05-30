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
import { useParams, usePathname, useRouter } from "next/navigation";
import CreateReportModal from "../Modals/CreateReportModal";
import { useUser } from "@/src/store/user";
import { Routes } from "@/src/lib/constants";
import DeleteCardModal from "../Modals/DeleteCardModal";

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
  const [isDeleteCardModal, setIsDeleteCardModal] = useState(false);

  const pathname = usePathname();
  const isCardInMyCardsPage = pathname === (Routes.MY_CARDS.MAIN);
  const isCardInCollectionPage = !!collectionId;
  const isCardInSavedPage = pathname === (Routes.SAVED);

  const { push } = useRouter();

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
      <Link 
        href={Routes.TRIP(card.id)} 
        className="w-full pb-[68%] relative group"
      >
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

        {isCardInMyCardsPage && (
          <div className="hidden absolute top-4 right-4 gap-2 group-hover:flex">
            <IconButton 
              icon={<Icons.edit />} 
              classes={`${classes} w-8 h-8 border-1 border-white`}
              onClick={() => push(Routes.MY_CARDS.EDIT(card.id))}
            />

            <IconButton 
              icon={<Icons.delete />} 
              classes={`${classes} w-8 h-8 border-1 border-white bg-error`}
              onClick={() => setIsDeleteCardModal(true)}
            />
          </div>
        )}
      </Link>
      <Link href={Routes.TRIP(card.id)} className="w-full flex flex-col gap-4">
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

      {isDeleteCardModal && (
        <DeleteCardModal 
          onClose={() => setIsDeleteCardModal(false)} 
          cardId={card.id}
        />
      )}
    </article>
  );
};

export default memo(TripMediumCard);
