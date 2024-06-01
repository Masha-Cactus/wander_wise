'use client';

import { Routes } from '@/src/lib/constants';
import { useGetCollection } from '@/src/queries';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { 
  Heading, 
  Heading2, 
  Heading4, 
  Icons, 
} from '@/src/components/atoms';
import { 
  BackButton, 
  IconButton, 
  PrimaryButton 
} from '@/src/components/moleculs';
import { 
  RenameCollectionModal, 
  DeleteCollectionModal, 
  Gallery 
} from '@/src/components/organisms';

const CollectionPage = () => {
  const { push } = useRouter();
  const { id: collectionId } = useParams();
  const { data: collection, error } = useGetCollection(+collectionId);

  const [isRenameCollectionModal, setIsRenameCollectionModal] = useState(false);
  const [isDeleteCollectionModal, setIsDeleteCollectionModal] = useState(false);

  useEffect(() => {
    if (isNaN(+collectionId) || error) {
      push(Routes.NOT_FOUND);
    }
  }, [collectionId, error]);

  return (
    <main className="grow bg-gray10">
      <div className="mx-10 my-10 flex flex-col gap-8">
        <BackButton />
        
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
          <div className="flex flex-col gap-4 justify-center text-center w-1/2 m-auto">
            <Heading 
              text="You don’t have any cards in this collection yet." 
              font="normal" 
            />
            <Heading4 text="Explore our community 🌏" font="medium" />
            <PrimaryButton text="Continue" onClick={() => push(Routes.TRIPS)} />
          </div>
        )}
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