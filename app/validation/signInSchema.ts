import { ObjectSchema } from "yup";
import * as Yup from "yup";
import { ISignIn } from "../services";
import { EMAIL_PATTERN } from "../lib/validation";

export const signInSchema = (): ObjectSchema<ISignIn> =>
  Yup.object().shape({
    email: Yup.string()
      .required("validation required")
      .email("validation email")
      .matches(EMAIL_PATTERN, "validation email"),
    password: Yup.string().required("validation required"),
  });