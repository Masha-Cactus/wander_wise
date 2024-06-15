import * as Yup from "yup";
import { ISignIn } from "@/src/services";
import { genericValidationSchema } from "@/src/validation";


export const signInSchema = (): Yup.ObjectSchema<ISignIn> =>
  Yup.object().shape({
    email: genericValidationSchema.email,
    password: genericValidationSchema.passwordWithoutTips,
  });
