import { useGetCollection } from "@/src/queries";

export function useGetCollectionCardIds (collectionId: number) {
  const { data: collection } = useGetCollection(collectionId);

  return collection?.cardDtos.map(card => card.id);
}