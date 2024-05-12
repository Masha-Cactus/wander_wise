import { ObjectSchema } from "yup";
import * as Yup from "yup";
import { genericValidationSchema } from "@/src/validation";

export const confirmEmailSchema 
= (): ObjectSchema<{confirmationCode: string}> =>
  Yup.object().shape({
    confirmationCode: genericValidationSchema.confirmationCode,
  });