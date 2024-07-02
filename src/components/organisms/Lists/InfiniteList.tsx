'use client';

import React, { 
  memo, 
  useCallback, 
  useEffect, 
  useMemo, 
  useRef, 
  useState 
} from "react";
import { ICard, ISearchCardResponse } from "@/src/services";
import { Loader, Icons } from "@/src/components/atoms";
import { TripXLCard, TripXSCard } from "@/src/components/organisms";
import { CARDS_PER_PAGE } from "@/src/lib/constants";
import { IconButton, CardsSkeleton } from "@/src/components/molecules";
import { AnimatePresence } from "framer-motion";

interface InfiniteListProps {
  pages: ISearchCardResponse[];
  isLastPage: boolean;
  page: number;
  isFetchingNextPage: boolean;
  handleNextPage: () => void;
}

const InfiniteList: React.FC<InfiniteListProps> 
= ({ pages, isLastPage, page, isFetchingNextPage, handleNextPage }) => {
  const allCards = useMemo(() => pages.reduce((acc, page) => 
    [...acc, ...page.cards], [] as ICard[]), [pages]);

  const [selectedCard, setSelectedCard] = useState(page * CARDS_PER_PAGE);
  const handleSelectCard = (pageIndex: number, cardIndex: number) => {
    setSelectedCard((pageIndex * CARDS_PER_PAGE) + cardIndex);
  };

  const handlePrevious = useCallback(() => {
    setSelectedCard(prevSelected => prevSelected - 1);
  }, []);

  const handleNext = useCallback(() => {
    setSelectedCard(prevSelected => prevSelected + 1);
  }, []);

  const pageRefs = useRef<{[key: number]: HTMLDivElement | null}>({});
  const pageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pageRefs.current[page] && pageContainerRef.current) {
      const childOffsetTop = pageRefs.current[page]?.offsetTop;
      
      if (childOffsetTop) {
        const offsetTop = childOffsetTop - pageContainerRef.current.offsetTop;
        
        pageContainerRef.current.scrollTop = offsetTop;
      }
    }
  }, []);

  const observerElem = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLastPage && !isFetchingNextPage) {
          handleNextPage();
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
  }, [pages, isLastPage, isFetchingNextPage]);

  if (!pages.length) {
    return <CardsSkeleton />;
  }

  return (
    <section
      className="grid max-h-[814px]
      w-full grid-cols-[1fr,210px] justify-items-center"
    >
      <div className="relative flex w-full items-end justify-center">
        <AnimatePresence mode="popLayout">
          <TripXLCard key={selectedCard} card={allCards[selectedCard]} /> 
        </AnimatePresence>
        <div 
          className="absolute bottom-0 right-12 flex h-fit w-fit flex-col gap-5"
        >
          <IconButton 
            icon={<Icons.up className="h-8 w-8 text-inherit"/>}
            disabled={selectedCard === 0}
            onClick={handlePrevious}
            classes="p-0 hover:text-gray-70 disabled:text-gray-50"
          />
          <IconButton 
            icon={<Icons.down className="h-8 w-8 text-inherit"/>}
            disabled={selectedCard === allCards.length - 1}
            onClick={handleNext}
            classes="p-0 hover:text-gray-70 disabled:text-gray-50"
          />
        </div>
      </div>

      <div 
        ref={pageContainerRef} 
        className="relative flex h-full flex-col gap-6 overflow-y-scroll"
      >
        {pages.map((page, pageIndex) => (
          <div 
            key={pageIndex} 
            ref={(el) => (pageRefs.current[pageIndex] = el)} 
            className="flex h-fit flex-col gap-6"
          >
            {page.cards.map((card, cardIndex) => (
              <button 
                key={card.id} 
                onClick={() => handleSelectCard(pageIndex, cardIndex)}
              >
                <TripXSCard card={card} />
              </button>
            ))}
          </div>
        ))}
        <div className="h-1 shrink-0" ref={observerElem}>
          {isFetchingNextPage && (
            <div className="h-12">
              <Loader size="sm" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default memo(InfiniteList);