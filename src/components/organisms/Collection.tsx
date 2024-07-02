import { twMerge } from "tailwind-merge";
import Image from "next/image";
import Link from "next/link";
import { TextMedium } from "@/src/components/atoms";
import { ICollection } from "@/src/services";
import { Routes } from "@/src/lib/constants";

interface CollectionProps {
  collection: ICollection,
}

const Collection: React.FC<CollectionProps> = ({ collection }) => {
  const collectionCards = collection.cardDtos.slice(0, 4);

  return (
    <Link href={Routes.COLLECTION(collection.id)}>
      <div 
        className="relative grid h-[282px] 
        w-[282px] grid-cols-[repeat(auto-fit,minmax(140px,1fr))] 
        gap-0.5 overflow-hidden rounded-2xl"
      >
        {collectionCards?.length ? (
          <>
            {collectionCards.map((card, i) => (
              <div 
                key={card.id} 
                className={twMerge('relative',
                  (i === 2 && i === collectionCards.length - 1) && 'col-span-2',
                )}
              >
                <Image 
                  src={card.imageLinks[0]} 
                  alt={card.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 
                  (max-width: 768px) 50vw, 25vw"
                  className="object-cover" 
                />
              </div>
            ))}
          </>
        ) : (
          <div 
            className="flex h-full w-full 
            items-center justify-center bg-gray-30"
          >
            <Image 
              src="/trip-default.webp" 
              alt="No collection images"
              width={120}
              height={120}
              className="h-32 w-32"
              priority={true}
            />
          </div>
        )}
        <div className="absolute inset-x-2 bottom-3 
          rounded-2xl bg-gray-80 px-6 py-2">
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