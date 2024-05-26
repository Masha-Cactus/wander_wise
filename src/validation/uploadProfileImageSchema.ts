import { ObjectSchema } from "yup";
import * as Yup from "yup";

export const uploadProfileImageSchema = (): ObjectSchema<{ image: File }> => 
  Yup.object().shape({
    image: Yup.mixed<File>().test(
      'is-file',
      'The value must be a file',
      (value) => value instanceof File
    )
      .required('File is required'),
  });
