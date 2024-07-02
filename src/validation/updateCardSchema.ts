import * as Yup from "yup";
import { genericValidationSchema } from "@/src/validation";
import { UpdateCardFormData } 
  from "@/src/components/organisms/Forms/EditCardForm";


export const updateCardSchema 
= (): Yup.ObjectSchema<UpdateCardFormData> =>
  Yup.object().shape({
    name: genericValidationSchema.name,
    location: genericValidationSchema.address.nullable(),
    description: genericValidationSchema.description
      .required('Description is required'),
    tripTypes: genericValidationSchema.tripTypes
      .min(1, 'Choose at least one trip type'),
    climate: genericValidationSchema.climateString,
    whyThisPlace: genericValidationSchema.whyThisPlace,
    imageLinks: genericValidationSchema.arrayPossiblyEmpty
      .of(Yup.string().url().required()),
    specialRequirements: genericValidationSchema.specialRequirements
      .min(1, 'Choose at least one special feature'),
    mapLink: genericValidationSchema.mapLink,
  });