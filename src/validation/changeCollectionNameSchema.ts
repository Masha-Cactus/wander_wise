import * as Yup from "yup";
import { genericValidationSchema } from "@/src/validation";

export const changeCollectionNameSchema 
= (): Yup.ObjectSchema<{newName: string}> => 
  Yup.object().shape({
    newName: genericValidationSchema.name,
  });