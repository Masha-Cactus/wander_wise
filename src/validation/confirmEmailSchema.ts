import { ObjectSchema } from "yup";
import * as Yup from "yup";

export const confirmEmailSchema 
= (): ObjectSchema<{confirmationCode: string}> =>
  Yup.object().shape({
    confirmationCode: Yup
      .string().trim().required('You must enter a confirmation code'),
  });