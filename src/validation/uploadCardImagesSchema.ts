import * as Yup from "yup";
import { CARD_IMAGES_LIMIT } from "../lib/constants";

export const uploadCardImagesSchema 
= (): Yup.ObjectSchema<{ images: File[] }> => 
  Yup.object().shape({
    images: Yup.array().min(1, 'You must attach at least one image')
      .max(CARD_IMAGES_LIMIT, `Maximum ${CARD_IMAGES_LIMIT} images allowed`)
      .required('Card images are required'),
  });