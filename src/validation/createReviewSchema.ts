import { ObjectSchema } from "yup";
import * as Yup from "yup";
import { ICreateComment } from "../services";

export const createReviewSchema 
= (): ObjectSchema<Omit<ICreateComment, 'cardId'>> => 
  Yup.object().shape({
    text: Yup.string().trim().required('Review text is required'),
    stars: Yup.number().min(0).max(5).required('You have to rate the card'),
  });