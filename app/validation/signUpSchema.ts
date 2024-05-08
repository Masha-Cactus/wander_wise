import * as Yup from "yup";
import { ObjectSchema } from "yup";

import {
  EMAIL_PATTERN,
  ONLY_SPACES_PATTERN,
  TEXT_INPUT_LENGTH,
} from "../lib/validation";
import { ISignUp } from "@/app/services";

export const signUpSchema = (): ObjectSchema<ISignUp> =>
  Yup.object().shape({
    firstName: Yup.string()
      .required("validation required ")
      .min(TEXT_INPUT_LENGTH.userName.min, "validation minCharLength")
      .max(TEXT_INPUT_LENGTH.userName.min, "validation maxCharLength")
      .matches(ONLY_SPACES_PATTERN, "validation emptyField"),
    lastName: Yup.string()
      .required(
        t("validation.required", { name: t(`${translationPrefix}.lastName`) })
      )
      .min(
        TEXT_INPUT_LENGTH.userName.min,
        t("validation.minCharLength", {
          number: TEXT_INPUT_LENGTH.userName.min,
        })
      )
      .max(
        TEXT_INPUT_LENGTH.userName.max,
        t("validation.maxCharLength", {
          number: TEXT_INPUT_LENGTH.userName.max,
        })
      )
      .matches(ONLY_SPACES_PATTERN, t("validation.emptyField")),
    email: Yup.string()
      .required(t("validation.required", { name: t("email.label") }))
      .email(t("email.invalid"))
      .matches(EMAIL_PATTERN, t("email.invalid")),
    password: Yup.string()
      .required(t("validation.required", { name: t("password.label") }))
      .min(
        TEXT_INPUT_LENGTH.password.min,
        t("validation.minCharLength", {
          number: TEXT_INPUT_LENGTH.password.min,
        })
      )
      .max(
        TEXT_INPUT_LENGTH.password.max,
        t("validation.maxCharLength", {
          number: TEXT_INPUT_LENGTH.password.max,
        })
      )
      .matches(ONLY_SPACES_PATTERN, t("validation.emptyField")),
  });
