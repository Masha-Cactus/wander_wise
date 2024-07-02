import { ICollection } from "@/src/services";

export const selectSavedCards = (collections: ICollection[]) => {
  return collections.find(
    (collection) => collection.name === "Saved cards")!;
};

export const selectCreatedCards = (collections: ICollection[]) => {
  return collections.find(
    (collection) => collection.name === "Created cards")!;
};

export const selectLikedCards = (collections: ICollection[]) => {
  return collections.find(
    (collection) => collection.name === "Liked cards")!;
};

export const selectOtherCollections = (collections: ICollection[]) => {
  return collections.filter(collection => 
      !['Saved cards', 'Liked cards', 'Created cards'].includes(collection.name));
};