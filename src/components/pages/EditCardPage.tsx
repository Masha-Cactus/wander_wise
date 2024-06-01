'use client';

import { Heading2, TextBase } from "@/src/components/atoms";
import { EditCardForm, AddCardImagesModal } from "@/src/components/organisms";
import { FormPageLayout } from "@/src/components/layouts";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useGetCardDetails } from "@/src/queries";
import { Routes } from "@/src/lib/constants";

const EditCardPage = () => {
  const { id } = useParams();
  const { push } = useRouter();
  const { data: card, error } = useGetCardDetails(+id);
  const [isAddCardImagesModal, setIsAddCardImagesModal] = useState(false);

  useEffect(() => {
    if (isNaN(+id) || error) {
      push(Routes.NOT_FOUND);
    }
  }, [id, error]);

  return (
    <FormPageLayout>
      <article className="w-[670px] self-center flex flex-col gap-6 
      items-center bg-white px-10 py-12 rounded-3xl relative">
        <button
          type="button"
          onClick={() => setIsAddCardImagesModal(true)}
          className="absolute top-5 right-5"
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

      {(isAddCardImagesModal && id) && (
        <AddCardImagesModal 
          cardId={+id} 
          onClose={() => setIsAddCardImagesModal(false)} 
        />
      )}
    </FormPageLayout>
  );
};

export default EditCardPage;