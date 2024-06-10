'use client';

import { Heading3, Heading4 } from "@/src/components/atoms";
import { Gallery, Pagination } from "@/src/components/organisms";
import { LinkButton } from "@/src/components/molecules";
import { useEffect, useState } from "react";
import { ICard, IFilterParams } from "@/src/services";
import { getFilteredCards } from "@/src/lib/helpers";
import { CARDS_PER_PAGE, Routes } from "@/src/lib/constants";
import { useGetUserCreatedCards } from "@/src/queries";

type Props = {
  filterParams: IFilterParams | null;
};

const CreatedCardsSection: React.FC<Props> = ({ filterParams }) => {
  const [page, setPage] = useState(0);
  const { data: createdCards } = useGetUserCreatedCards();

  const [filteredCards, setFilteredCards] = useState<ICard[]>([]);
  const [displayedCards, setDisplayedCards] = useState<ICard[]>([]);

  const totalPages = Math.ceil(filteredCards.length / CARDS_PER_PAGE);

  useEffect(() => {
    setDisplayedCards(filteredCards
      .slice(page * CARDS_PER_PAGE, (page + 1) * CARDS_PER_PAGE));
  }, [page, createdCards, filteredCards]);

  useEffect(() => {
    if (createdCards && filterParams) {
      setFilteredCards(getFilteredCards(createdCards, filterParams));
    } else if (createdCards && !filterParams) {
      setFilteredCards(createdCards);
    }
  }, [createdCards, filterParams]);

  return (
    <section className="w-full px-10 py-8 flex flex-col 
    justify-between items-center gap-8">
      <div className="w-full flex justify-between align-center">
        <div className="flex gap-2 items-center">
          <Heading3 text="My created cards" />
          <Heading4 text={`(${createdCards?.length || 0})`} font="normal" classes="text-gray-30" />
        </div>
        <LinkButton 
          path={Routes.MY_CARDS.CREATE}
          text="+ New card"
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

export default CreatedCardsSection;