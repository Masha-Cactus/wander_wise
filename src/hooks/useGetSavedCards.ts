import { useGetCollection, useGetUserCollections } from "@/src/queries";

export function useGetSavedCards () {
  const { data: collections } = useGetUserCollections();
  const savedCardsCollectionId = collections?.find(
    (collection) => collection.name === "Saved cards"
  )?.id;
  const {data: collection} = useGetCollection(savedCardsCollectionId!);

  return collection?.cardDtos;
}