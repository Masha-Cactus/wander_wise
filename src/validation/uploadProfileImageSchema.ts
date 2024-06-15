import * as Yup from "yup";

export const uploadProfileImageSchema 
= (): Yup.ObjectSchema<{ image: File }> => 
  Yup.object().shape({
    image: Yup.mixed<File>().required('File is required'),
  });
