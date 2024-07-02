import * as Yup from "yup";
import { IUpdatePassword } from "@/src/services";
import { genericValidationSchema } from "@/src/validation";

export const changePasswordSchema 
= (): Yup.ObjectSchema<Omit<IUpdatePassword, 'userId'>> =>
  Yup.object().shape({
    oldPassword: genericValidationSchema.passwordWithoutTips,
    password: genericValidationSchema.password,
    repeatPassword: genericValidationSchema.repeatPassword,
  });