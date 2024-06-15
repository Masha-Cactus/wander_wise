import * as Yup from "yup";
import { ISignUp } from "@/src/services";
import { genericValidationSchema } from "@/src/validation";

export const signUpSchema = (
): Yup.ObjectSchema<ISignUp> =>
  Yup.object().shape({
    email: genericValidationSchema.email,
    password: genericValidationSchema.password,
    repeatPassword: genericValidationSchema.repeatPassword,
  });
