import { ObjectSchema } from "yup";
import * as Yup from "yup";
import { IUpdateInfo } from "@/src/services";
import { ONLY_SPACES_PATTERN, TEXT_INPUT_LENGTH } from "../lib/validation";

export const editProfileSchema 
= (): ObjectSchema<Omit<IUpdateInfo, 'userId'>> =>
  Yup.object().shape({
    pseudonym: Yup.string().trim()
      .required( "validation required ")
      .min(TEXT_INPUT_LENGTH.userName.min, "validation minCharLength")
      .max(TEXT_INPUT_LENGTH.userName.min, "validation maxCharLength")
      .matches(ONLY_SPACES_PATTERN, "validation emptyField"),
    firstName: Yup.string().trim()
      .required( "validation required "),
    lastName: Yup.string().trim()
      .required( "validation required "),
    bio: Yup.string().trim()
      .required( "validation required "),
    location: Yup.string().trim()
      .required( "validation required "),
  });