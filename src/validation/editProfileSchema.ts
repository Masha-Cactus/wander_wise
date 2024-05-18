import { ObjectSchema } from "yup";
import * as Yup from "yup";
import { genericValidationSchema } from "@/src/validation";
import { 
  ProfileEditFormData 
} from "../components/organisms/Forms/ProfileEditForm";


export const editProfileSchema 
= (): ObjectSchema<ProfileEditFormData> =>
  Yup.object().shape({
    pseudonym: genericValidationSchema.pseudonym,
    firstName: genericValidationSchema.firstName,
    lastName: genericValidationSchema.lastName,
    bio: genericValidationSchema.bio,
    location: genericValidationSchema.address,
  });