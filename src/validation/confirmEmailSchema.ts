import * as Yup from "yup";
import { genericValidationSchema } from "@/src/validation";

export const confirmEmailSchema 
= (): Yup.ObjectSchema<{confirmationCode: string}> =>
  Yup.object().shape({
    confirmationCode: genericValidationSchema.confirmationCode,
  });