'use client';

import { useDeleteCollection, useGetCollection } from '@/src/queries';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Heading, Heading2, Heading4, Icons } from '../atoms';
import { BackButton, IconButton, PrimaryButton } from '../moleculs';
import { ChangeCollectionNameForm, Gallery } from '../organisms';

const CollectionPage = () => {
  const { push } = useRouter();
  const { id: collectionId } = useParams();
  const { data: collection } = useGetCollection(+collectionId);

  const { mutate: deleteCollection } = useDeleteCollection();

  const [isEditName, setIsEditName] = useState(false);

  return (
    <main className="w-full h-full bg-gray10">
      <div className="mx-10 my-10 flex flex-col gap-8">
        <BackButton />
        
        <div className="w-full flex justify-between">
          {collection && isEditName ? (
            <ChangeCollectionNameForm 
              collection={collection}
              hideForm={() => setIsEditName(false)}
            />
          ) : (
            <Heading2 text={collection?.name || 'Collection'} font="semibold" />
          )}

          <div className="flex gap-4">
            <IconButton 
              text="Rename collection" 
              icon={<Icons.edit />} 
              classes="border border-black rounded-3xl"
              onClick={() => setIsEditName(true)} 
            />
            <IconButton 
              text="Delete collection" 
              icon={<Icons.delete />} 
              classes="border border-error text-error rounded-3xl"
              onClick={() => deleteCollection(+collectionId)}
            />
          </div>
        </div>

        {collection && collection.cardDtos.length ? (
          <Gallery cards={collection.cardDtos} />
        ) : (
          <div className="flex flex-col gap-4 justify-center text-center">
            <Heading 
              text="You don’t have any cards in this collection yet." 
              font="normal" 
            />
            <Heading4 text="Explore our community 🌏" font="medium" />
            <PrimaryButton text="Continue" onClick={() => push('/trips')} />
          </div>
        )}
      </div>
    </main>
  );
};

export default CollectionPage;