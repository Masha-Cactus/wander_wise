import { ObjectSchema } from "yup";
import * as Yup from "yup";
import { IEmail } from "@/src/services";
import { genericValidationSchema } from "./genericSchema";

export const changeEmailSchema = (): ObjectSchema<IEmail> =>
  Yup.object().shape({
    email: genericValidationSchema.email,
  });