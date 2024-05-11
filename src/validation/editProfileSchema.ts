import { ObjectSchema } from "yup";
import * as Yup from "yup";
import { IUpdateInfo } from "@/src/services";
import { ONLY_SPACES_PATTERN, TEXT_INPUT_LENGTH } from "../lib/validation";

export const editProfileSchema 
= (): ObjectSchema<Omit<IUpdateInfo, 'userId'>> =>
  Yup.object().shape({
    pseudonym: Yup.string().trim()
      .required('Username field is required')
      .min(
        TEXT_INPUT_LENGTH.userName.min, 
        'Username must be at lest 2 characters'
      )
      .max(
        TEXT_INPUT_LENGTH.userName.min, 
        'Username must be maximum 64 characters'
      )
      .matches(
        ONLY_SPACES_PATTERN, 
        'Username cannot be empty'
      ),
    firstName: Yup.string().trim()
      .required('First name field is required'),
    lastName: Yup.string().trim()
      .required('Last name field is required'),
    bio: Yup.string().trim()
      .required('Profile description is required'),
    location: Yup.string().trim()
      .required('Location field is required'),
  });