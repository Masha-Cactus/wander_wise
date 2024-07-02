import * as Yup from "yup";
import { genericValidationSchema } from "@/src/validation";
import { IFilterParams } from "@/src/services";

export const filterCardsSchema 
= (): Yup.ObjectSchema<IFilterParams> =>
  Yup.object().shape({
    tripTypes: genericValidationSchema.tripTypes,
    authors: genericValidationSchema.author,
    climates: genericValidationSchema.climateArray,
    countries: genericValidationSchema.arrayPossiblyEmpty
      .of(Yup.string().trim().required()),
    specialRequirements: genericValidationSchema.specialRequirements,
  });