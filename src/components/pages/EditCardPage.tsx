'use client';

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { Heading2, TextBase } from "@/src/components/atoms";
import { EditCardForm, AddCardImagesModal } from "@/src/components/organisms";
import { useGetCardDetails } from "@/src/queries";
import { Routes } from "@/src/lib/constants";
import { useUser } from "@/src/store/user";
import { StandardPageLayout } from "@/src/components/templates";

const EditCardPage = () => {
  const { id } = useParams();
  const { push } = useRouter();
  const { user } = useUser();
  const { data: card, isError } = useGetCardDetails(+id);
  const [isAddCardImagesModal, setIsAddCardImagesModal] = useState(false);
  const isCardCreatedByUser =  card && user && card.author === user.pseudonym;

  useEffect(() => {
    if (isNaN(+id) || isError || (card && !isCardCreatedByUser)) {
      push(Routes.NOT_FOUND);
    }
  }, [id, isError, isCardCreatedByUser, card, push]);

  return (
    <StandardPageLayout>
      <article className="relative flex w-[670px] flex-col items-center 
      gap-6 self-center rounded-3xl bg-white px-10 py-12">
        <button
          type="button"
          onClick={() => setIsAddCardImagesModal(true)}
          className="absolute right-5 top-5"
        >
          <TextBase
            text="+ Add photo" 
            font="semibold" 
            classes="underline underline-offset-8"
          />
        </button>
        <Heading2 
          text="Edit your card" 
          font="semibold" 
          classes="self-start" 
        />

        {!!card && (
          <EditCardForm card={card} />
        )}
      </article>
      
      <AnimatePresence>
        {(isAddCardImagesModal && id) && (
          <AddCardImagesModal 
            key="addCardImagesModal"
            cardId={+id} 
            onClose={() => setIsAddCardImagesModal(false)} 
          />
        )}
      </AnimatePresence>
    </StandardPageLayout>
  );
};

export default EditCardPage;