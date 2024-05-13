import { ObjectSchema } from "yup";
import { ISearchCard } from "@/src/services";
import * as Yup from "yup";

import { genericValidationSchema } from "@/src/validation";


export const searchCardsSchema 
= (): ObjectSchema<ISearchCard> =>
  Yup.object().shape({
    startLocation: genericValidationSchema.startLocation,
    tripTypes: genericValidationSchema.tripTypes,
    author: genericValidationSchema.author,
    climate: genericValidationSchema.climate,
    travelDistance: genericValidationSchema.travelDistance,
    specialRequirements: genericValidationSchema.specialRequirements,
  });