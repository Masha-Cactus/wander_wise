'use client';

import { useGetSavedCards } from "@/src/hooks";
import { Heading3, Heading5, Heading, Heading4 } from "@/src/components/atoms";
import Gallery from "../Lists/Gallery";
import { PrimaryButton } from "../../moleculs";
import { useRouter } from "next/navigation";
import Link from "next/link";


const SavedCardsSection = () => {
  const savedCards = useGetSavedCards();
  const { push } = useRouter();

  return (
    <section>
      <div className="w-full flex justify-between">
        <Heading3 text={`My saved cards (${savedCards?.length || 0})`} />
        <Link href="/saved/collections">
          <Heading5
            text="My collections" 
            font="semibold" 
            classes="underline"
          />
        </Link>
      </div>

      {savedCards ? (
        <Gallery cards={savedCards} />
      ) : (
        <div className="flex flex-col gap-4">
          <Heading text="You don’t have any saved cards yet." font="normal" />
          <Heading4 text="Explore our community 🌏" font="medium" />
          <PrimaryButton text="Continue" onClick={() => push('/trips')} />
        </div>
      )}

    </section>
  );
};

export default SavedCardsSection;