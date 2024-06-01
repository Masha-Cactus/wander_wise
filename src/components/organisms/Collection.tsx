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
        className="w-[282px] h-[282px] grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] 
          gap-0.5 relative rounded-2xl overflow-hidden"
      >
        {collectionCards?.length ? (
          <>
            {collectionCards.map(card => (
              <div className="relative">
              <Image 
                key={card.id} 
                src={card.imageLinks[0]} 
                alt={card.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                className="object-cover" 
              />
              </div>
            ))}
          </>
        ) : (
          <div className="bg-gray30 w-[282px] h-[282px] flex justify-center items-center">
            <Image 
              src="/trip-default.png" 
              alt="No collection images"
              width={120}
              height={120}
            />
          </div>
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