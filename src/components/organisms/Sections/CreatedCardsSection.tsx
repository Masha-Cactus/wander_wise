'use client';

import { useGetCreatedCards } from "@/src/hooks";
import { Heading3, Heading5, Heading, Heading4 } from "@/src/components/atoms";
import { Gallery } from "@/src/components/organisms";
import { PrimaryButton } from "@/src/components/moleculs";
import { useRouter } from "next/navigation";
import Link from "next/link";


const CreatedCardsSection = () => {
  const createdCards = useGetCreatedCards();
  const { push } = useRouter();

  return (
    <section className="w-full self-start pt-8 px-10 pb-10">
      <div className="w-full flex justify-between align-center">
        <div className="flex gap-2">
          <Heading3 text="My created cards" />
          <Heading4 text={`(${createdCards?.length || 0})`} font="normal" classes="text-gray30" />
        </div>
        <Link href="/my-cards/create">
          <Heading5
            text="+ New card" 
            font="semibold" 
            classes="underline underline-offset-8"
          />
        </Link>
      </div>

      {createdCards ? (
        <Gallery cards={createdCards} />
      ) : (
        <div className="flex flex-col gap-4">
          <Heading text="You don’t have any created cards yet." font="normal" />
          <Heading4 text="Explore our community 🌏" font="medium" />
          <PrimaryButton text="Continue" onClick={() => push('/trips')} />
        </div>
      )}

    </section>
  );
};

export default CreatedCardsSection;