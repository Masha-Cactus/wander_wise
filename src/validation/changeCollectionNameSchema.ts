import { ObjectSchema } from "yup";
import * as Yup from "yup";

export const changeCollectionNameSchema 
= (): ObjectSchema<{newName: string}> => 
  Yup.object().shape({
    newName: Yup.string().trim().required('Collection name is required'),
  });