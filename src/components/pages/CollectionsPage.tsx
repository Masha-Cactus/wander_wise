'use client';

import { Heading3, Divider, Heading4, Loader } from "@/src/components/atoms";
import { LinkButton } from "@/src/components/molecules";
import { useGetUserCollections } from "@/src/queries";
import { Collection } from "@/src/components/organisms";
import { Routes } from "@/src/lib/constants";
import { 
  StandardPageLayout,
  LoadingStateWrapper 
} from "@/src/components/templates";
import { selectOtherCollections } from "@/src/lib/collectionSelectors";
import { ICollection } from "@/src/services";

const CollectionsPage = () => {
  const { 
    data: collections, 
    isLoading 
  } = useGetUserCollections<ICollection[]>(selectOtherCollections);

  return (
    <StandardPageLayout>
      <article className="flex w-[670px] flex-col items-center gap-6 
      self-center rounded-3xl bg-white px-10 py-12">
        <div className="flex w-full items-center justify-between">
          <Heading3 
            text="My collections" 
          />
          <LinkButton 
            path={Routes.COLLECTIONS.CREATE}
            text="+ Create new collection"
          />
        </div>

        <Divider />

        <LoadingStateWrapper
          isEmpty={collections && !collections.length}
          emptyFallbackComponent={
            <Heading4 
              text="You don’t have any collection yet." 
              classes="text-gray-80 self-start" 
              font="normal"
            />
          }
          isLoading={isLoading}
          loadingFallbackComponent={
            <Loader classes="my-8" size="md" />
          }
        >
          {!!collections?.length && (
            <div className="grid w-full grid-cols-[repeat(2,282px)] gap-5">
              {collections.map(collection => (
                <Collection key={collection.id} collection={collection} />
              ))}
            </div>
          )}
        </LoadingStateWrapper>
      </article>
    </StandardPageLayout>
  );
};

export default CollectionsPage;