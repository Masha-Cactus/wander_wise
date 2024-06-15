'use client';

import { memo, useEffect, useState } from 'react';
import { AnimatePresence } from "framer-motion";
import { useParams, useRouter } from 'next/navigation';
import { Routes } from '@/src/lib/constants';
import { useGetCollection } from '@/src/queries';
import { Heading2, Icons } from '@/src/components/atoms';
import { 
  IconButton, 
  PrimaryButton,
  LoadedContentStateController
} from '@/src/components/molecules';
import { 
  RenameCollectionModal, 
  DeleteCollectionModal, 
  Gallery,
} from '@/src/components/organisms';
import { StandardPageLayout } from '@/src/components/templates';

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
    <StandardPageLayout>
      <LoadedContentStateController
        isLoading={isLoading}
      > 
        <div className="flex w-full justify-between">
          <Heading2 text={collection?.name || 'Collection'} font="semibold" />

          <div className="flex gap-4 h-fit">
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
            className="m-auto flex w-max flex-col 
            items-center justify-center gap-6 pt-8"
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

      <AnimatePresence>
        {isRenameCollectionModal && (
          <RenameCollectionModal
            key="renameCollectionModal"
            onClose={() => setIsRenameCollectionModal(false)} 
          />
        )}

        {isDeleteCollectionModal && (
          <DeleteCollectionModal
            key="deleteCollectionModal"
            onClose={() => setIsDeleteCollectionModal(false)} 
            collectionId={collection!.id}
          />
        )}
      </AnimatePresence>
    </StandardPageLayout>
  );
};

export default memo(CollectionPage);