import { ObjectSchema } from "yup";
import * as Yup from "yup";
import { genericValidationSchema } from "./genericSchema";

export const changeCollectionNameSchema 
= (): ObjectSchema<{newName: string}> => 
  Yup.object().shape({
    newName: genericValidationSchema.name,
  });