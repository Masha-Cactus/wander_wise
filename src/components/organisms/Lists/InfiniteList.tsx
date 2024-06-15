'use client';

import { 
  Dispatch, 
  memo, 
  SetStateAction, 
  useEffect, 
  useRef, 
  useState 
} from "react";
import { ICard } from "@/src/services";
import { Icons, Loader } from "@/src/components/atoms";
import { TripXLCard, TripXSCard } from "@/src/components/organisms";
import { CARDS_PER_PAGE } from "@/src/lib/constants";
import { CardsSkeleton, IconButton } from "@/src/components/molecules";

type Props = {
  cards: ICard[];
  setPage: Dispatch<SetStateAction<number>>,
  isLastPage: boolean;
  page: number;
  isFetchingNextPage: boolean;
};

const InfiniteList: React.FC<Props> 
= ({ cards, setPage, isLastPage, page, isFetchingNextPage }) => {
  const [selectedCard, setSelectedCard] = useState(CARDS_PER_PAGE * page);
  const observerElem = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLastPage && !isFetchingNextPage) {
          setPage(page => page + 1);
        }
      },
      { threshold: [0.2] }
    );

    const observedElement = observerElem.current;

    if (observedElement) {
      observer.observe(observedElement);
    }

    return () => {
      if (observedElement) {
        observer.unobserve(observedElement);
      }
    };
  }, [cards, isLastPage, setPage, isFetchingNextPage]);

  if (!cards.length) {
    return <CardsSkeleton />;
  }

  return (
    <section
      className="col-span-3 col-start-2 grid h-full 
      w-full grid-cols-[1fr,210px] justify-items-center
      after:relative after:h-px after:-bottom-8 after:w-full"
    >
      <div className="relative h-fit">
        <TripXLCard key={cards[selectedCard].id} card={cards[selectedCard]} />

        <div className="absolute bottom-0 left-full ml-6 flex flex-col gap-5">
          <IconButton 
            icon={<Icons.up className="h-8 w-8 text-inherit"/>}
            disabled={selectedCard === 0}
            onClick={() => setSelectedCard(curr => curr - 1)}
            classes="p-0 hover:text-gray-70 disabled:text-gray-50"
          />
          <IconButton 
            icon={<Icons.down className="h-8 w-8 text-inherit"/>}
            disabled={selectedCard === cards.length - 1}
            onClick={() => setSelectedCard(curr => curr + 1)}
            classes="p-0 hover:text-gray-70 disabled:text-gray-50"
          />
        </div>
      </div>

      <div className="flex h-full flex-col gap-6 overflow-y-scroll">
        {cards.map((card, i) => (
          <button key={card.id} onClick={() => setSelectedCard(i)}>
            <TripXSCard card={card} />
          </button>
        ))}
        <div className="h-1 shrink-0" ref={observerElem}>
          {isFetchingNextPage && (
            <Loader classes="w-8 h-8 gap-0.5" />
          )}
        </div>
      </div>
    </section>
  );
};

export default memo(InfiniteList);