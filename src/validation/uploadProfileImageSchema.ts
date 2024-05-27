import { ObjectSchema } from "yup";
import * as Yup from "yup";

export const uploadProfileImageSchema = (): ObjectSchema<{ image: File }> => 
  Yup.object().shape({
    image: Yup.mixed<File>().required('File is required'),
  });
