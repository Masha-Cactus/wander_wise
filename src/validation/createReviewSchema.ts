import * as Yup from "yup";
import { ICreateComment } from "@/src/services";
import { genericValidationSchema } from "@/src/validation";

export const createReviewSchema 
= (): Yup.ObjectSchema<Omit<ICreateComment, 'cardId'>> => 
  Yup.object().shape({
    text: genericValidationSchema.description
      .required('Review text is required'),
    stars: Yup.number().min(0).max(5).required('You have to rate the card'),
  });