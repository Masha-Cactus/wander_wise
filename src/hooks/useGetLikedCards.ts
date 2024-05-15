import { useGetCollection, useGetUserCollections } from "@/src/queries";

export function useGetLikedCards () {
  const { data: collections } = useGetUserCollections();
  const savedCardsCollectionId = collections?.find(
    (collection) => collection.name === "Liked cards"
  )?.id;
  const {data: collection} = useGetCollection(savedCardsCollectionId!);

  return collection?.cardDtos;
}