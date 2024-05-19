import { ObjectSchema } from "yup";
import * as Yup from "yup";

import { genericValidationSchema } from "@/src/validation";
import { IFilterParams } from "@/src/services";

export const filterCardsSchema 
= (): ObjectSchema<IFilterParams> =>
  Yup.object().shape({
    tripTypes: genericValidationSchema.tripTypes,
    authors: genericValidationSchema.author,
    climates: genericValidationSchema.climate,
    countries: Yup.array().required(),
    specialRequirements: genericValidationSchema.specialRequirements,
  });