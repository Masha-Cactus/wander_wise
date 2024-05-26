'use client';

import { Heading2 } from "@/src/components/atoms";
import { 
  CreateCardForm, 
  UploadCardImagesForm 
} from "@/src/components/organisms";
import { useEffect, useRef, useState } from "react";
import { FormPageLayout } from "@/src/components/layouts";


const CreateCardPage = () => {
  const [newCardId, setNewCardId] = useState<number| null>(null);
  const scrollRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (newCardId && scrollRef.current) {
      scrollRef.current.scrollIntoView();
    }
  }, [newCardId]);

  return (
    <FormPageLayout>
      <article className="w-[670px] self-center flex flex-col gap-6 
      items-center bg-white px-10 py-12 rounded-3xl">
        <Heading2 
          text="Create a new card" 
          font="semibold" 
          classes="self-start" 
        />

        <CreateCardForm setNewCardId={setNewCardId} />
      </article>
    
      {newCardId && (
        <article 
          ref={scrollRef}
          className="w-[670px] self-center flex flex-col gap-6 
          items-center bg-white px-10 py-12 rounded-3xl">
          <Heading2 
            text="Upload images for your new card" 
            font="semibold" 
            classes="self-start" 
          />
          <UploadCardImagesForm cardId={newCardId} />
        </article>
      )}
    </FormPageLayout>
  );
};

export default CreateCardPage;