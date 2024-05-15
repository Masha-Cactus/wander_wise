'use client';

import { BackButton } from "@/src/components/moleculs";
import { Heading3, Heading5, Divider } from "@/src/components/atoms";
import { useGetUserCollections } from "@/src/queries";
import Collection from "../organisms/Collection";

const CollectionsPage = () => {
  const { data: collections } = useGetUserCollections();

  return (
    <main className="h-full bg-gray10 p-10 flex flex-col 
    gap-8 overflow-scroll">
      <BackButton />
      <article className="w-[670px] self-center flex flex-col gap-6 
      items-center bg-white px-10 py-12 rounded-3xl">
        <div className="w-full flex justify-between">
          <Heading3 
            text="My collections" 
          />
          <Heading5
            text="+ Create new collection" 
            font="semibold" 
            classes=" underline-offset-8 text-gray80"
          />
        </div>

        <Divider classes="w-full h-px" />

        <div className="w-full grid 
          grid-cols-[repeat(auto-fit,minmax(282px,1fr))">
          {collections?.map(collection => (
            <Collection key={collection.id} collectionId={collection.id} />
          ))}
        </div>
      </article>
    </main>
  );
};

export default CollectionsPage;