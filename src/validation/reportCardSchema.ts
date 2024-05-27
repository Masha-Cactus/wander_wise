import { ObjectSchema } from "yup";
import * as Yup from "yup";
import { genericValidationSchema } from "./genericSchema";

export const reportCardSchema = (): ObjectSchema<{ text: string }> => 
  Yup.object().shape({
    text: genericValidationSchema.description
      .required('This field is required'),
  });