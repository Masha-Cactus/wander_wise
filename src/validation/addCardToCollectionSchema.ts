import * as Yup from "yup";
import { genericValidationSchema } from "@/src/validation";

export const addCardToCollectionSchema
= (): Yup.ObjectSchema<{selectedCollectionIds: number[]}> => 
  Yup.object().shape({
    selectedCollectionIds: genericValidationSchema.arrayPossiblyEmpty
      .of(Yup.number().required('Ids must be numbers')),
  });