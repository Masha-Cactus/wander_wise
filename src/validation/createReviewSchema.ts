import { ObjectSchema } from "yup";
import * as Yup from "yup";
import { ICreateComment } from "../services";
import { genericValidationSchema } from "./genericSchema";

export const createReviewSchema 
= (): ObjectSchema<Omit<ICreateComment, 'cardId'>> => 
  Yup.object().shape({
    text: genericValidationSchema.description
      .required('Review text is required'),
    stars: Yup.number().min(0).max(5).required('You have to rate the card'),
  });