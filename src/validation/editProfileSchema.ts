import * as Yup from "yup";
import { genericValidationSchema } from "@/src/validation";
import { 
  ProfileEditFormData 
} from "@/src/components/organisms/Forms/ProfileEditForm";


export const editProfileSchema 
= (): Yup.ObjectSchema<ProfileEditFormData> =>
  Yup.object().shape({
    pseudonym: genericValidationSchema.pseudonym,
    firstName: genericValidationSchema.firstName,
    lastName: genericValidationSchema.lastName,
    bio: genericValidationSchema.description,
    location: genericValidationSchema.address.nullable(),
  });