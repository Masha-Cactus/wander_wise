import * as Yup from "yup";
import { genericValidationSchema } from "@/src/validation";
import { CreateCardFormData } 
  from "@/src/components/organisms/Forms/CreateCardForm";


export const createCardSchema 
= (): Yup.ObjectSchema<CreateCardFormData> =>
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
    specialRequirements: genericValidationSchema.specialRequirements
      .min(1, 'Choose at least one special feature'),
    mapLink: genericValidationSchema.mapLink,
  });