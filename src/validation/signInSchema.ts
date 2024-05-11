import { ObjectSchema } from "yup";
import * as Yup from "yup";
import { ISignIn } from "@/src/services";
import { 
  EMAIL_PATTERN, 
  PASSWORD_PATTERN, 
  TEXT_INPUT_LENGTH 
} from "@/src/lib/validation";

export const signInSchema = (): ObjectSchema<ISignIn> =>
  Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Email must be valid')
      .matches(EMAIL_PATTERN, 'Email must be valid'),
    password: Yup.string()
      .required('Password is required')
      .min(
        TEXT_INPUT_LENGTH.password.min,
        'Password must be at least 8 characters'
      )
      .max(
        TEXT_INPUT_LENGTH.password.max,
        'Password must be maximum 128 characters'
      )
      .matches(PASSWORD_PATTERN, 
        'Password must not contain whitespaces'),
  });
