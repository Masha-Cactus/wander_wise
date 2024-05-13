import { ObjectSchema } from "yup";
import * as Yup from "yup";
import { IUpdatePassword } from "@/src/services";
import { genericValidationSchema } from "./genericSchema";

export const changePasswordSchema 
= (): ObjectSchema<Omit<IUpdatePassword, 'userId'>> =>
  Yup.object().shape({
    oldPassword: genericValidationSchema.passwordWithoutTips,
    password: genericValidationSchema.password,
    repeatPassword: genericValidationSchema.repeatPassword,
  });