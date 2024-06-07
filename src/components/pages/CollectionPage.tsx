'use client';

import { Routes } from '@/src/lib/constants';
import { useGetCollection } from '@/src/queries';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Heading2, Icons } from '@/src/components/atoms';
import { 
  BackButton, 
  IconButton, 
  PrimaryButton,
  LoadedContentStateController
} from '@/src/components/molecules';
import { 
  RenameCollectionModal, 
  DeleteCollectionModal, 
  Gallery,
} from '@/src/components/organisms';

const CollectionPage = () => {
  const { push } = useRouter();
  const { id: collectionId } = useParams();
  const { 
    data: collection, 
    error, 
    isLoading 
  } = useGetCollection(+collectionId);

  const [isRenameCollectionModal, setIsRenameCollectionModal] = useState(false);
  const [isDeleteCollectionModal, setIsDeleteCollectionModal] = useState(false);

  useEffect(() => {
    if (isNaN(+collectionId) || error) {
      push(Routes.NOT_FOUND);
    }
  }, [collectionId, error, push]);

  return (
    <main className="grow bg-gray-10">
      <div className="mx-10 my-10 flex flex-col gap-8">
        <BackButton />

        <LoadedContentStateController
          isLoading={isLoading}
        > 
          <div className="w-full flex justify-between">
            <Heading2 text={collection?.name || 'Collection'} font="semibold" />

            <div className="flex gap-4">
              <IconButton 
                text="Rename collection" 
                icon={<Icons.edit />} 
                classes="border border-black rounded-3xl"
                onClick={() => setIsRenameCollectionModal(true)}
              />
              <IconButton 
                text="Delete collection" 
                icon={<Icons.delete />} 
                classes="border border-error text-error rounded-3xl"
                onClick={() => setIsDeleteCollectionModal(true)}
              />
            </div>
          </div>

          {collection && collection.cardDtos.length ? (
            <Gallery cards={collection.cardDtos} />
          ) : (
            <div 
              className="flex flex-col gap-6 justify-center 
              items-center w-max m-auto pt-8"
            >
              <Heading2 
                text="You don’t have any cards in this collection yet." 
                font="normal" 
              />
              <PrimaryButton 
                text="Explore our community 🌏" 
                onClick={() => push(Routes.TRIPS)} 
                classes="w-1/2"
              />
            </div>
          )}
        </LoadedContentStateController>
      </div>

      {isRenameCollectionModal && (
        <RenameCollectionModal
          onClose={() => setIsRenameCollectionModal(false)} 
        />
      )}

      {isDeleteCollectionModal && (
        <DeleteCollectionModal
          onClose={() => setIsDeleteCollectionModal(false)} 
          collectionId={collection!.id}
        />
      )}
    </main>
  );
};

export default CollectionPage;