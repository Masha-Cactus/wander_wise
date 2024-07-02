'use client';

import { memo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useParams, usePathname, useRouter } from "next/navigation";
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
import {
  AddCardToCollectionModal,
  RemoveTripFromCollectionModal,
  CreateReportModal,
  DeleteCardModal
} from "@/src/components/organisms";
import { useUser } from "@/src/store/user";
import { Routes } from "@/src/lib/constants";
import { useCopyUrlToClipboard } from "@/src/hooks";

interface TripMCardProps {
  card: ICard;
}

const TripMCard: React.FC<TripMCardProps> = ({ card }) => {
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

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsDeleteCardModal(true);
  }; 

  const [isCopied, copy] = useCopyUrlToClipboard(Routes.TRIP(card.id));

  return (
    <article
      className="flex flex-col items-center gap-4 rounded-3xl bg-white p-4"
    >
      <Link 
        href={Routes.TRIP(card.id)} 
        className="group relative w-full overflow-hidden rounded-3xl pb-[68%]"
      >
        {isCopied && (
          <span 
            className="absolute inset-x-2 top-2 z-10 flex 
         items-center justify-center rounded-2xl bg-gray-10 py-2"
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
          <div className="absolute right-4 top-4 hidden gap-2 group-hover:flex">
            <IconButton 
              icon={<Icons.edit className="h-4 w-4" />} 
              classes={`bg-gray-80 text-white rounded-full p-2 border border-white`}
              onClick={handleEdit}
            />

            <IconButton 
              icon={<Icons.delete className="h-4 w-4" />} 
              classes={`text-white rounded-full p-2 border border-white bg-error`}
              onClick={handleDelete}
            />
          </div>
        )}
      </Link>
      <div className="flex w-full grow flex-col gap-4">
        <div className="flex w-full justify-between">
          <LikeButton
            cardId={card.id}
            cardLikes={card.likes}
            classes="bg-gray-80 text-white rounded-full"
          />

          <IconButton 
            icon={<Icons.share />} 
            text="Share" 
            classes="bg-gray-80 text-white rounded-full" 
            size="small"
            onClick={copy}
          />

          <IconButton 
            icon={<Icons.report />} 
            text="Report" 
            classes="bg-gray-80 text-white rounded-full"
            size="small"
            onClick={() => setIsReportCardModal(true)}
            disabled={!user}
          />

          <IconButton
            icon={card.author === "AI" ? <Icons.jpt /> : <Icons.user />}
            text={card.author === "AI" ? "AI" : "User"}
            classes="bg-gray-80 text-white rounded-full"
            size="small"
          />
        </div>
        <Divider />

        <Heading5 text={card.name} font="medium" classes="line-clamp-2" />
        <TextBase text={card.whereIs} font="normal" classes="grow" />
      </div>

      {isCardInSavedPage ? (
        <PrimaryButton 
          text="Add to the collection" 
          type="button"
          onClick={() => setIsAddToCollectionModal(true)}
        />
      ) : (
        <>
          {isCardInCollectionPage ? (
            <PrimaryButton 
              text="Remove from the collection" 
              type="button"
              onClick={() => setIsRemoveFromCollectionModal(true)}
              classes="bg-gray-30 text-gray-70"
            />
          ) : (
            <SaveButton cardId={card.id} />
          )}
        </>
      )}

      <AnimatePresence>
        {isAddToCollectionModal && (
          <AddCardToCollectionModal
            key="addCardToCollectionModal"
            card={card}
            onClose={() => setIsAddToCollectionModal(false)}
          />
        )}
        {isRemoveFromCollectionModal && (
          <RemoveTripFromCollectionModal
            key="removeCardFromCollectionModal"
            trip={card}
            collectionId={+collectionId}
            onClose={() => setIsRemoveFromCollectionModal(false)}
          />
        )}
        {isReportCardModal && (
          <CreateReportModal 
            key="createReportModal"
            type="Card" 
            onClose={() => setIsReportCardModal(false)} 
          />
        )}

        {isDeleteCardModal && (
          <DeleteCardModal 
            key="deleteCardModal"
            onClose={() => setIsDeleteCardModal(false)} 
            cardId={card.id}
          />
        )}
      </AnimatePresence>
    </article>
  );
};

export default memo(TripMCard);
