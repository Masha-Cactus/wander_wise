'use client';

import { ICard } from "@/src/services";
import { 
  Dispatch, 
  memo, 
  SetStateAction, 
  useEffect, 
  useRef, 
  useState 
} from "react";
import { Icons, TextMedium } from "@/src/components/atoms";
import { TripXLCard, TripXSCard } from "@/src/components/organisms";
import { CARDS_PER_PAGE } from "@/src/lib/constants";

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
  }, [isLastPage, setPage, isFetchingNextPage]);

  return (
    <section
      className="w-full h-full grid grid-cols-[1fr,210px] 
      justify-items-center col-start-2 col-span-3"
    >
      <div className="h-fit relative">
        <TripXLCard card={cards[selectedCard]} />

        <div className="flex flex-col gap-5 ml-6 absolute left-full bottom-8">
          <button
            className="text-black disabled:text-gray-70 h-full w-8 
          flex items-center justify-center"
            onClick={() => setSelectedCard(curr => curr - 1)}
            disabled={selectedCard === 0}
          >
            <Icons.up className="w-8 h-8"/>
          </button>
          <button
            className="text-black disabled:text-gray-70 h-full w-8 
          flex items-center justify-center"
            onClick={() => setSelectedCard(curr => curr + 1)}
            disabled={selectedCard === cards.length - 1}
          >
            <Icons.down className="w-8 h-8"/>
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-6 h-full overflow-y-scroll">
        {cards.map((card, i) => (
          <button key={card.id} onClick={() => setSelectedCard(i)}>
            <TripXSCard card={card} />
          </button>
        ))}
        <div className="h-1 shrink-0" ref={observerElem}>
          {isFetchingNextPage && (
            <TextMedium 
              text="Loading more..." 
              classes="animate-pulse text-center mb-6" 
              font="normal" 
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default memo(InfiniteList);