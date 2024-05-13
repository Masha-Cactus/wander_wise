import { ObjectSchema } from "yup";
import * as Yup from "yup";
import { IEmail } from "../services";
import { EMAIL_PATTERN } from "../lib/validation";

export const changeEmailSchema = (): ObjectSchema<IEmail> =>
  Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Email must be valid')
      .matches(EMAIL_PATTERN, 'Email must be valid'),
  });