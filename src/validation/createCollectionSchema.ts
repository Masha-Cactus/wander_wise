import * as Yup from "yup";
import { ICreateCollection } from "@/src/services";
import { genericValidationSchema } from "@/src/validation";

export const createCollectionSchema 
= (): Yup.ObjectSchema<Omit<ICreateCollection, 'userId'>> => 
  Yup.object().shape({
    name: genericValidationSchema.name,
    cardIds: genericValidationSchema.arrayPossiblyEmpty
      .of(Yup.number().required('Ids must be numbers')),
  });

export const createCollectionShortSchema
= (): Yup.ObjectSchema<{name: string}> => 
  Yup.object().shape({
    name: genericValidationSchema.name,
  });