'use client';

import { useEffect, useState } from "react";
import { Heading3, Heading4 } from "@/src/components/atoms";
import { Gallery, Pagination } from "@/src/components/organisms";
import { LinkButton } from "@/src/components/molecules";
import { ICard, IFilterParams } from "@/src/services";
import { getFilteredCards } from "@/src/lib/helpers";
import { CARDS_PER_PAGE, Routes } from "@/src/lib/constants";
import { useGetUserSavedCards } from "@/src/queries";

type Props = {
  filterParams: IFilterParams | null;
};

const SavedCardsSection: React.FC<Props> = ({ filterParams }) => {
  const [page, setPage] = useState(0);
  const { data: savedCards } = useGetUserSavedCards();

  const [filteredCards, setFilteredCards] = useState<ICard[]>([]);
  const [displayedCards, setDisplayedCards] = useState<ICard[]>([]);

  const totalPages = Math.ceil(filteredCards.length / CARDS_PER_PAGE);

  useEffect(() => {
    setDisplayedCards(filteredCards
      .slice(page * CARDS_PER_PAGE, (page + 1) * CARDS_PER_PAGE));
  }, [page, savedCards, filteredCards]);

  useEffect(() => {
    if (savedCards && filterParams) {
      setFilteredCards(getFilteredCards(savedCards, filterParams));
    } else if (savedCards && !filterParams) {
      setFilteredCards(savedCards);
    }
  }, [savedCards, filterParams]);

  return (
    <section className="flex w-full flex-col items-center justify-between 
      gap-8 px-10 py-8"
    >
      <div className="align-center flex w-full justify-between">
        <div className="flex items-center gap-2">
          <Heading3 text="My saved cards" />
          <Heading4 
            text={`(${savedCards?.length || 0})`} 
            font="normal" 
            classes="text-gray-30" 
          />
        </div>
        <LinkButton 
          path={Routes.COLLECTIONS.MAIN}
          text="My collections"
        />
      </div>

      <Gallery cards={displayedCards} />

      {totalPages > 1 && (
        <Pagination 
          page={page} 
          total={totalPages}
          setPage={setPage}
          isLastPage={page === totalPages - 1}
        />
      )}

    </section>
  );
};

export default SavedCardsSection;