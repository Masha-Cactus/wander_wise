'use client';

import { useGetSavedCards } from "@/src/hooks";
import { Heading3, Heading, Heading4 } from "@/src/components/atoms";
import { Gallery, Pagination } from "@/src/components/organisms";
import { PrimaryButton, LinkButton } from "@/src/components/moleculs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ICard, IFilterParams } from "@/src/services";
import { getFilteredCards } from "@/src/lib/helpers";
import { CARDS_PER_PAGE } from "@/src/lib/constants";

type Props = {
  filterParams: IFilterParams | null;
};

const SavedCardsSection: React.FC<Props> = ({ filterParams }) => {
  const [page, setPage] = useState(0);
  const savedCards = useGetSavedCards();
  const { push } = useRouter();

  const [filteredCards, setFilteredCards] = useState<ICard[]>([]);
  const [displayedCards, setDisplayedCards] = useState<ICard[]>([]);

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
    <section className="w-full self-start pt-8 px-10 pb-10">
      <div className="w-full flex justify-between align-center">
        <div className="flex gap-2 items-center">
          <Heading3 text="My saved cards" />
          <Heading4 text={`(${savedCards?.length || 0})`} font="normal" classes="text-gray30" />
        </div>
        <LinkButton 
          path="/saved/collections"
          text="My collections"
        />
      </div>

      {savedCards ? (
        <>
          <Gallery cards={displayedCards} />
          <Pagination 
            page={page} 
            total={Math.ceil(savedCards.length / CARDS_PER_PAGE)}
            setPage={setPage}
            isLastPage={page === Math.ceil(
              savedCards.length / CARDS_PER_PAGE)}
            isPlaceholderData={false}
          />
        </>
      ) : (
        <div className="flex flex-col gap-4 justify-center text-center">
          <Heading text="You don’t have any saved cards yet." font="normal" />
          <Heading4 text="Explore our community 🌏" font="medium" />
          <PrimaryButton text="Continue" onClick={() => push('/trips')} />
        </div>
      )}

    </section>
  );
};

export default SavedCardsSection;