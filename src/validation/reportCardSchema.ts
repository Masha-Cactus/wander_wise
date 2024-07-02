import * as Yup from "yup";
import { genericValidationSchema } from "@/src/validation";

export const reportCardSchema = (): Yup.ObjectSchema<{ text: string }> => 
  Yup.object().shape({
    text: genericValidationSchema.description
      .required('This field is required'),
  });