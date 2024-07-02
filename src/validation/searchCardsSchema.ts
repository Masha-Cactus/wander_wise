import * as Yup from "yup";
import { genericValidationSchema } from "@/src/validation";
import { FilterFormData } 
  from "@/src/components/organisms/Forms/SearchCardsForm";

export const searchCardsSchema 
= (): Yup.ObjectSchema<FilterFormData> =>
  Yup.object().shape({
    startLocation: genericValidationSchema.address
      .nonNullable('Start location is required'),
    tripTypes: genericValidationSchema.tripTypes,
    author: genericValidationSchema.author,
    climate: genericValidationSchema.climateArray,
    travelDistance: genericValidationSchema.travelDistance,
    specialRequirements: genericValidationSchema.specialRequirements,
  });