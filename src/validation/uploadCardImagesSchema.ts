import * as Yup from "yup";

export const uploadCardImagesSchema 
= (): Yup.ObjectSchema<{ images: File[] }> => 
  Yup.object().shape({
    images: Yup.array().min(1, 'You must attach at least one image')
      .required('Card images are required'),
  });