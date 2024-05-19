'use client';

import { Heading2, Heading5 } from "@/src/components/atoms";
import { EditCardForm, AddCardImagesModal } from "@/src/components/organisms";
import { FormPageLayout } from "@/src/components/layouts";
import { useState } from "react";
import { useParams } from "next/navigation";

const EditCardPage = () => {
  const { id } = useParams();
  const [isAddCardImagesModal, setIsAddCardImagesModal] = useState(false);

  return (
    <FormPageLayout>
      <article className="w-[670px] self-center flex flex-col gap-6 
      items-center bg-white px-10 py-12 rounded-3xl relative">
        <button
          type="button"
          onClick={() => setIsAddCardImagesModal(true)}
          className="absolute top-2.5 right-2.5"
        >
          <Heading5
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

        <EditCardForm />

        {(isAddCardImagesModal && id) && (
          <AddCardImagesModal 
            cardId={+id} 
            onClose={() => setIsAddCardImagesModal(false)} 
          />
        )}
      </article>
    </FormPageLayout>
  );
};

export default EditCardPage;