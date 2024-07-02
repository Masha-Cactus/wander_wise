'use client';

import { useEffect, useRef, useState } from "react";
import { Heading2 } from "@/src/components/atoms";
import { 
  CreateCardForm, 
  UploadCardImagesForm 
} from "@/src/components/organisms";
import { StandardPageLayout } from "@/src/components/templates";

const CreateCardPage = () => {
  const [newCardId, setNewCardId] = useState<number| null>(null);
  const scrollRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (newCardId && scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [newCardId]);

  return (
    <StandardPageLayout>
      <article className="flex w-[670px] flex-col items-center gap-6 
      self-center rounded-3xl bg-white px-10 py-12">
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
          className="flex w-[670px] flex-col items-center gap-6 
          self-center rounded-3xl bg-white px-10 py-12">
          <Heading2 
            text="Upload images for your new card" 
            font="semibold" 
            classes="self-start" 
          />
          <UploadCardImagesForm cardId={newCardId} />
        </article>
      )}
    </StandardPageLayout>
  );
};

export default CreateCardPage;