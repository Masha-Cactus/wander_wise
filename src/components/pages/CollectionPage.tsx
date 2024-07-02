'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence } from "framer-motion";
import { useParams, useRouter } from 'next/navigation';
import { Routes } from '@/src/lib/constants';
import { useGetCollection } from '@/src/queries';
import { 
  Heading2, 
  Icons, 
  Loader, 
  Divider, 
  Heading5,
  Heading4
} from '@/src/components/atoms';
import { IconButton } from '@/src/components/molecules';
import { 
  RenameCollectionModal, 
  DeleteCollectionModal, 
  Gallery,
} from '@/src/components/organisms';
import { 
  StandardPageLayout,
  LoadingStateWrapper 
} from '@/src/components/templates';
import { useCopyUrlToClipboard } from '@/src/hooks';

const CollectionPage = () => {
  const { push } = useRouter();
  const { id: collectionId } = useParams();
  const { 
    data: collection, 
    isError, 
    isLoading 
  } = useGetCollection(+collectionId);

  const [isRenameCollectionModal, setIsRenameCollectionModal] = useState(false);
  const [isDeleteCollectionModal, setIsDeleteCollectionModal] = useState(false);

  const [isCopied, copy] = useCopyUrlToClipboard(
    Routes.COLLECTION(+collectionId)
  );

  useEffect(() => {
    if (isNaN(+collectionId) || isError) {
      push(Routes.NOT_FOUND);
    }
  }, [collectionId, isError, push]);

  return (
    <StandardPageLayout>
      <LoadingStateWrapper
        isLoading={isLoading}
        loadingFallbackComponent={<Loader size="lg" />}
      > 
        <div className="flex w-full items-center justify-between">
          <Heading2 text={collection?.name || 'Collection'} font="semibold" />

          <div className="relative flex h-8 items-center gap-5">
            <div className="flex h-fit gap-4">
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

            <Divider classes="h-full w-px" />

            <IconButton 
              icon={<Icons.share className="h-6 w-6" />} 
              onClick={copy}
              classes="p-0"
            />

            {isCopied && (
              <span 
                className="absolute bottom-[44px] right-0 flex 
                items-center  justify-center rounded-2xl bg-white px-6 py-2"
              >
                <Heading5 
                  text="Copied to clipboard!" 
                  font="medium" 
                  classes="text-gray-80" 
                />
              </span>
            )}
          </div> 
        </div>

        {collection && collection.cardDtos.length ? (
          <Gallery cards={collection.cardDtos} />
        ) : (
          <Heading4 
            text="You don’t have any cards in this collection yet." 
            font="normal"
            classes="pt-4" 
          />
        )}
      </LoadingStateWrapper>

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

export default CollectionPage;