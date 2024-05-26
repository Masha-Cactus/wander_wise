import { ObjectSchema } from "yup";
import * as Yup from "yup";
import { genericValidationSchema } from "./genericSchema";

export const addCardToCollectionSchema
= (): ObjectSchema<{selectedCollectionIds: number[]}> => 
  Yup.object().shape({
    selectedCollectionIds: genericValidationSchema.arrayPossiblyEmpty
      .of(Yup.number().required('Ids must be numbers')),
  });