import { ObjectSchema } from "yup";
import * as Yup from "yup";

export const addCardToCollectionSchema
= (): ObjectSchema<{selectedCollectionIds: number[]}> => 
  Yup.object().shape({
    selectedCollectionIds: Yup.array().required(),
  });