import { ObjectSchema } from "yup";
import * as Yup from "yup";
import { IUpdateInfo } from "@/src/services";
import { genericValidationSchema } from "@/src/validation";


export const editProfileSchema 
= (): ObjectSchema<Omit<IUpdateInfo, 'userId'>> =>
  Yup.object().shape({
    pseudonym: genericValidationSchema.pseudonym,
    firstName: genericValidationSchema.firstName,
    lastName: genericValidationSchema.lastName,
    bio: genericValidationSchema.bio,
    location: genericValidationSchema.location,
  });