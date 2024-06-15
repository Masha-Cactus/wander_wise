import * as Yup from "yup";
import { genericValidationSchema } from "@/src/validation";

export const socialLinkSchema = (): Yup.ObjectSchema<{ link: string }> => 
  Yup.object().shape({
    link: genericValidationSchema.link,
  });