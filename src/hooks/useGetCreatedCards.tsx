import { useGetCollection, useGetUserCollections } from "@/src/queries";

export function useGetCreatedCards () {
  const { data: collections } = useGetUserCollections();
  const savedCardsCollectionId = collections?.find(
    (collection) => collection.name === "Created cards"
  )?.id;
  const {data: collection} = useGetCollection(savedCardsCollectionId!);

  return collection?.cardDtos;
}