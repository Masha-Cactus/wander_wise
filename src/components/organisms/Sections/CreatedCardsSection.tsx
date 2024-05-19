'use client';

import { useGetCreatedCards } from "@/src/hooks";
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

const CreatedCardsSection: React.FC<Props> = ({ filterParams }) => {
  const [page, setPage] = useState(0);
  const createdCards = useGetCreatedCards();
  const { push } = useRouter();

  const [filteredCards, setFilteredCards] = useState<ICard[]>([]);
  const [displayedCards, setDisplayedCards] = useState<ICard[]>([]);

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
    <section className="w-full self-start pt-8 px-10 pb-10">
      <div className="w-full flex justify-between align-center">
        <div className="flex gap-2 items-center">
          <Heading3 text="My created cards" />
          <Heading4 text={`(${createdCards?.length || 0})`} font="normal" classes="text-gray30" />
        </div>
        <LinkButton 
          path="/my-cards/create"
          text="+ New card"
        />
      </div>

      {createdCards ? (
        <>
          <Gallery cards={displayedCards} />
          <Pagination 
            page={page} 
            total={Math.ceil(createdCards.length / CARDS_PER_PAGE)}
            setPage={setPage}
            isLastPage={page === Math.ceil(
              createdCards.length / CARDS_PER_PAGE)}
            isPlaceholderData={false}
          />
        </>
      ) : (
        <div className="flex flex-col gap-4 justify-center text-center">
          <Heading text="You don’t have any created cards yet." font="normal" />
          <Heading4 text="Explore our community 🌏" font="medium" />
          <PrimaryButton text="Continue" onClick={() => push('/trips')} />
        </div>
      )}

    </section>
  );
};

export default CreatedCardsSection;