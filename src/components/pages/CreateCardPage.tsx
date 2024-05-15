'use client';

import { BackButton } from "@/src/components/moleculs";
import { Heading2 } from "@/src/components/atoms";
import { CreateCardForm, UploadCardImagesForm } from "../organisms";
import { useEffect, useRef, useState } from "react";


const CreateCardPage = () => {
  const [newCardId, setNewCardId] = useState<number| null>(null);
  const scrollRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (newCardId && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [newCardId]);

  return (
    <main ref={scrollRef} className="h-full bg-gray10 p-10 flex flex-col 
    gap-8 overflow-scroll">
      <BackButton />
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
        <article className="w-[670px] self-center flex flex-col gap-6 
          items-center bg-white px-10 py-12 rounded-3xl">
          <Heading2 
            text="Upload images for your new card" 
            font="semibold" 
            classes="self-start" 
          />
          <UploadCardImagesForm newCardId={newCardId} />
        </article>
      )}
    </main>
  );
};

export default CreateCardPage;