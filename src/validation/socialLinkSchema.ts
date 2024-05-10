import { ObjectSchema } from "yup";
import * as Yup from "yup";

export const socialLinkSchema = (): ObjectSchema<{ link: string }> => 
  Yup.object().shape({
    link: Yup.string().url()
      .required( "validation required "),
  });