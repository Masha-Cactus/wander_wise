import { useGetCollection } from "@/src/queries";
import Image from "next/image";
import { TextMedium } from "../atoms";

type Props = {
  collectionId: number,
};

const Collection: React.FC<Props> = ({ collectionId }) => {
  const {data: collection} = useGetCollection(collectionId);
  const collectionCards = collection?.cardDtos.slice(0, 4);

  return (
    <>
      <div 
        className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] 
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
          <div className="bg-gray30 rounded-3xl w-[282px] h-[282px]"></div>
        )}
        <div className="absolute inset-x-2 bottom-3 w-full 
          py-2 px-6 bg-gray80 rounded-2xl">
          <TextMedium 
            text={collection?.name || ''} 
            font="semibold" 
            classes="w-full truncate text-white" 
          />
        </div>
      </div>
    </>
  );
};

export default Collection;