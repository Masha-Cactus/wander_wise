import { ObjectSchema } from "yup";
import * as Yup from "yup";

import { genericValidationSchema } from "@/src/validation";
import { FilterFormData } from "../components/organisms/Forms/SearchCardsForm";

export const searchCardsSchema 
= (): ObjectSchema<FilterFormData> =>
  Yup.object().shape({
    startLocation: genericValidationSchema.address
      .nonNullable('Start location is required'),
    tripTypes: genericValidationSchema.tripTypes,
    author: genericValidationSchema.author,
    climate: genericValidationSchema.climateArray,
    travelDistance: genericValidationSchema.travelDistance,
    specialRequirements: genericValidationSchema.specialRequirements,
  });