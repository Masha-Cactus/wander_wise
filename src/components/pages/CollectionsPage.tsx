'use client';

import { Heading3, Divider, Heading4 } from "@/src/components/atoms";
import { 
  LinkButton, 
  LoadedContentStateController 
} from "@/src/components/molecules";
import { useGetUserCollections } from "@/src/queries";
import { Collection } from "@/src/components/organisms";
import { FormPageLayout } from "@/src/components/layouts";
import { Routes } from "@/src/lib/constants";

const CollectionsPage = () => {
  const { data: collections, isLoading} = useGetUserCollections();

  return (
    <FormPageLayout>
      <article className="w-[670px] self-center flex flex-col gap-6 
      items-center bg-white px-10 py-12 rounded-3xl">
        <div className="w-full flex justify-between">
          <Heading3 
            text="My collections" 
          />
          <LinkButton 
            path={Routes.COLLECTIONS.CREATE}
            text="+ Create new collection"
          />
        </div>

        <Divider />

        <LoadedContentStateController
          isEmpty={collections && !collections.length}
          emptyFallbackComponent={
            <Heading4 
              text="You don’t have any collection yet." 
              classes="text-gray-80 self-start" 
              font="normal"
            />
          }
          isLoading={isLoading}
        >
          <div className="w-full grid gap-5
            grid-cols-[repeat(2,282px)]">
            {collections?.map(collection => (
              <Collection key={collection.id} collection={collection} />
            ))}
          </div>
        </LoadedContentStateController>
      </article>
    </FormPageLayout>
  );
};

export default CollectionsPage;