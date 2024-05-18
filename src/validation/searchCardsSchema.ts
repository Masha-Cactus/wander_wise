import { ObjectSchema } from "yup";
import * as Yup from "yup";

import { genericValidationSchema } from "@/src/validation";
import { FilterFormData } from "../components/organisms/Forms/FilterForm";

export const searchCardsSchema 
= (): ObjectSchema<FilterFormData> =>
  Yup.object().shape({
    startLocation: genericValidationSchema.address,
    tripTypes: genericValidationSchema.tripTypes,
    author: genericValidationSchema.author,
    climate: genericValidationSchema.climate,
    travelDistance: genericValidationSchema.travelDistance,
    specialRequirements: genericValidationSchema.specialRequirements,
  });