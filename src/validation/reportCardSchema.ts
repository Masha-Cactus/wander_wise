import { ObjectSchema } from "yup";
import * as Yup from "yup";

export const reportCardSchema = (): ObjectSchema<{ text: string }> => 
  Yup.object().shape({
    text: Yup.string().trim().required('This field is required'),
  });