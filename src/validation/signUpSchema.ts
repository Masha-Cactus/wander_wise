import * as Yup from "yup";
import { ObjectSchema } from "yup";

import { ISignUp } from "@/src/services";
import { genericValidationSchema } from "@/src/validation";

export const signUpSchema = (
): ObjectSchema<ISignUp> =>
  Yup.object().shape({
    email: genericValidationSchema.email,
    password: genericValidationSchema.passwordWithoutTips,
    repeatPassword: genericValidationSchema.repeatPassword,
  });
