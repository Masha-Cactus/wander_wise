'use client';

import Link from "next/link";
import { Divider, Icons, Heading5, TextBase } from "@/src/components/atoms";
import { 
  LikeButton, 
  SaveButton, 
  IconButton, 
  PrimaryButton,
  TripImage
} from "@/src/components/molecules";
import { ICard } from "@/src/services";
import { memo, useState } from "react";
import {
  AddCardToCollectionModal,
  RemoveTripFromCollectionModal,
  CreateReportModal,
  DeleteCardModal
} from "@/src/components/organisms";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useUser } from "@/src/store/user";
import { Routes } from "@/src/lib/constants";
import { useCopyUrlToClipboard } from "@/src/hooks";

type Props = {
  card: ICard;
};

const classes = "bg-gray-80 text-white rounded-full";

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
  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    push(Routes.MY_CARDS.EDIT(card.id));
  };

  const [isCopied, copy] = useCopyUrlToClipboard(Routes.TRIP(card.id));

  return (
    <article
      className="flex flex-col gap-4 items-center 
      rounded-3xl bg-white p-4"
    >
      <Link 
        href={Routes.TRIP(card.id)} 
        className="w-full pb-[68%] relative group rounded-3xl overflow-hidden"
      >
        {isCopied && (
          <span 
            className="z-10 absolute flex justify-center items-center 
         bg-gray-10 rounded-3xl inset-x-2 top-2 py-2"
          >
            <TextBase text="Copied to clipboard!" font="medium" />
          </span>
        )}

        <TripImage 
          imageLinks={card.imageLinks}
          alt={card.name}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
        />

        {isCardInMyCardsPage && (
          <div className="hidden absolute top-4 right-4 gap-2 group-hover:flex">
            <IconButton 
              icon={<Icons.edit className="w-5 h-5" />} 
              classes={`${classes} p-1 border-1 border-white`}
              onClick={handleEdit}
            />

            <IconButton 
              icon={<Icons.delete className="w-5 h-5" />} 
              classes={`${classes} p-1 border-1 border-white bg-error`}
              onClick={() => setIsDeleteCardModal(true)}
            />
          </div>
        )}
      </Link>
      <div className="w-full flex flex-col gap-4 grow">
        <div className="w-full flex justify-between">
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
            onClick={copy}
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
            icon={card.author === "AI" ? <Icons.jpt /> : <Icons.user />}
            text={card.author === "AI" ? "AI" : "User"}
            classes={classes}
            size="small"
          />
        </div>
        <Divider />

        <Heading5 text={card.name} font="medium" />
        <TextBase text={card.whereIs} font="normal" classes="grow" />
      </div>

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
                classes="bg-gray-30 text-gray-70"
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
