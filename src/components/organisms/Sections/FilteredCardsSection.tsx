"use client";

import { useEffect, useState, memo } from "react";
import { Heading3, Heading4 } from "@/src/components/atoms";
import { Gallery, Pagination } from "@/src/components/organisms";
import { LinkButton } from "@/src/components/molecules";
import { ICard, IFilterParams } from "@/src/services";
import { getFilteredCards } from "@/src/lib/helpers";
import { CARDS_PER_PAGE } from "@/src/lib/constants";

interface FilteredCardsSectionProps {
  filterParams: IFilterParams | null;
  cards: ICard[];
  title: string;
  linkText: string;
  linkPath: string;
}

const FilteredCardsSection: React.FC<FilteredCardsSectionProps> 
= ({ filterParams, cards, title, linkText, linkPath }) => {
  const [page, setPage] = useState(0);

  const [filteredCards, setFilteredCards] = useState<ICard[]>([]);
  const [displayedCards, setDisplayedCards] = useState<ICard[]>([]);

  const totalPages = Math.ceil(filteredCards.length / CARDS_PER_PAGE);

  useEffect(() => {
    setDisplayedCards(filteredCards
      .slice(page * CARDS_PER_PAGE, (page + 1) * CARDS_PER_PAGE));
  }, [page, cards, filteredCards]);

  useEffect(() => {
    if (filterParams) {
      setFilteredCards(getFilteredCards(cards, filterParams));
    } else {
      setFilteredCards(cards);
    }
  }, [cards, filterParams]);

  return (
    <section 
      className="flex min-h-full w-full flex-col items-center gap-8 px-10 py-8"
    >
      <div className="align-center flex w-full justify-between">
        <div className="flex items-center gap-2">
          <Heading3 text={title} />
          <Heading4 
            text={`(${cards?.length || 0})`} 
            font="normal" 
            classes="text-gray-30" 
          />
        </div>
        <LinkButton 
          path={linkPath}
          text={linkText}
        />
      </div>

      {displayedCards.length ? (
        <>
          <Gallery cards={displayedCards} />

          {totalPages > 1 && (
            <Pagination 
              page={page} 
              setPage={setPage}
              lastPage={totalPages - 1}
            />
          )}
        </>
      ) : (
        <div className="m-auto text-center">
          <Heading4 
            text="No cards matching your preferences found 😢." 
            font="medium"
            classes="text-gray-80"
          />
          <Heading4 
            text="Try setting other filter parameters"
            font="medium" 
            classes="text-gray-80"
          />
        </div>
      )}
    </section>
  );
};

export default memo(FilteredCardsSection);