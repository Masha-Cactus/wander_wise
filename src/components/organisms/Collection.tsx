import Image from "next/image";
import { TextMedium } from "@/src/components/atoms";
import { ICollection } from "@/src/services";
import Link from "next/link";
import { Routes } from "@/src/lib/constants";

type Props = {
  collection: ICollection,
};

const Collection: React.FC<Props> = ({ collection }) => {
  const collectionCards = collection.cardDtos.slice(0, 4);

  return (
    <Link href={Routes.COLLECTION(collection.id)}>
      <div 
        className="w-[282px] grid grid-cols-[repeat(2,140px)] 
          gap-0.5 relative"
      >
        {collectionCards?.length ? (
          <>
            {collectionCards.map(card => (
              <Image 
                key={card.id} 
                src={card.imageLinks[0]} 
                alt={card.name} 
                className="rounded-3xl" 
              />
            ))}
          </>
        ) : (
          <div className="bg-gray30 rounded-3xl w-[282px] h-[282px]" />
        )}
        <div className="absolute inset-x-2 bottom-3 
          py-2 px-6 bg-gray80 rounded-2xl">
          <TextMedium 
            text={collection?.name || ''} 
            font="semibold" 
            classes="w-full truncate text-white" 
          />
        </div>
      </div>
    </Link>
  );
};

export default Collection;