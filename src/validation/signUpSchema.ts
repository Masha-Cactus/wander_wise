import * as Yup from "yup";
import { ObjectSchema } from "yup";

import { 
  EMAIL_PATTERN, 
  PASSWORD_PATTERN, 
  TEXT_INPUT_LENGTH 
} from "../lib/validation";
import { ISignUp } from "../services";

export const signUpSchema = (
): ObjectSchema<ISignUp> =>
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
    repeatPassword: Yup.string()
      .required('Password confirmation is required')
      .test(
        'arePasswordsEqual', 
        'Password and confirmation must be equal', 
        function (value, testContext) { 
          return value === testContext.parent.password;
        }),
  });
