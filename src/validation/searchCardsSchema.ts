import { ObjectSchema } from "yup";
import { ISearchCard } from "../services";
import * as Yup from "yup";

export const searchCardsSchema 
= (): ObjectSchema<ISearchCard> =>
  Yup.object().shape({
    startLocation: 
    Yup.string().trim().required('Please, enter your start location'),
    tripTypes: Yup.array().required(),
    author: Yup.array().required(),
    climate: Yup.array().required(),
    travelDistance: Yup.array().required(),
    specialRequirements: Yup.array().required(),
  });