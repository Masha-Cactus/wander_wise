import Image from "next/image";
import Link from "next/link";

import { Divider, Icons } from "@/src/components/atoms";
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

const classes = "bg-gray80 text-white rounded-full px-4 py-2";

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
      round bg-white p-4 w-[325px]"
    >
      <Link href={`/trips/${card.id}`} className="w-full">
        <Image
          src={card.imageLinks[0]}
          alt={card.name}
          width={200}
          height={200}
          className="w-full h-full object-cover round"
        />
      </Link>
      <Link href={`/trips/${card.id}`} className="flex flex-col gap-4">
        <div className="flex gap-2">
          <LikeButton
            cardId={card.id}
            cardLikes={card.likes}
            classes={classes}
          />

          <IconButton icon={<Icons.share />} text="Share" classes={classes} />

          <IconButton icon={<Icons.report />} text="Report" classes={classes} />

          <IconButton
            icon={<Icons.user />}
            text={card.author === "AI" ? "AI" : "User"}
            classes={classes}
          />
        </div>
        <Divider classes="w-full h-px" />
        <h2 className="text-xl font-medium">{card.name}</h2>
        <p className="text-base font-regular">{card.whereIs}</p>
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
