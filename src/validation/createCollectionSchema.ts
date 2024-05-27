import { ObjectSchema } from "yup";
import * as Yup from "yup";
import { ICreateCollection } from "../services";
import { genericValidationSchema } from "./genericSchema";

export const createCollectionSchema 
= (): ObjectSchema<Omit<ICreateCollection, 'userId'>> => 
  Yup.object().shape({
    name: genericValidationSchema.name,
    cardIds: genericValidationSchema.arrayPossiblyEmpty
      .of(Yup.number().required('Ids must be numbers')),
  });

export const createCollectionShortSchema
= (): ObjectSchema<{name: string}> => 
  Yup.object().shape({
    name: genericValidationSchema.name,
  });