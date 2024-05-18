import { ObjectSchema } from "yup";
import { Climate } from "@/src/services";
import * as Yup from "yup";

import { genericValidationSchema } from "@/src/validation";
import { CreateCardFormData } 
  from "../components/organisms/Forms/CreateCardForm";


export const createCardSchema 
= (): ObjectSchema<CreateCardFormData> =>
  Yup.object().shape({
    name: Yup.string().trim().required('Card name is required'),
    location: genericValidationSchema.address,
    description: Yup.string().trim().required('Description is required'),
    tripTypes: genericValidationSchema.tripTypes,
    climate: Yup.string().trim()
      .oneOf(Object.values(Climate)).required('Climate is required'),
    whyThisPlace: Yup.array().required('This field is required'),
    imageLinks: Yup.array().required(),
    specialRequirements: genericValidationSchema.specialRequirements,
    mapLink: genericValidationSchema.link,
  });