import { ObjectSchema } from "yup";
import * as Yup from "yup";

import { genericValidationSchema } from "@/src/validation";
import { CreateCardFormData } 
  from "../components/organisms/Forms/CreateCardForm";


export const createCardSchema 
= (): ObjectSchema<CreateCardFormData> =>
  Yup.object().shape({
    name: genericValidationSchema.name,
    location: genericValidationSchema.address
      .nonNullable('Location is required'),
    description: genericValidationSchema.description
      .required('Card description is required'),
    tripTypes: genericValidationSchema.tripTypes
      .min(1, 'Choose at least one trip type'),
    climate: genericValidationSchema.climateString,
    whyThisPlace: genericValidationSchema.whyThisPlace,
    imageLinks: genericValidationSchema.arrayPossiblyEmpty
      .of(Yup.string().url().required()),
    specialRequirements: genericValidationSchema.specialRequirements
      .min(1, 'Choose at least one special feature'),
  });