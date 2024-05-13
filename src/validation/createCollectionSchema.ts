import { ObjectSchema } from "yup";
import * as Yup from "yup";
import { ICreateCollection } from "../services";

export const createCollectionSchema 
= (): ObjectSchema<Omit<ICreateCollection, 'userId'>> => 
  Yup.object().shape({
    name: Yup.string().trim().required('Collection name is required'),
    cardIds: Yup.array().required(),
  });