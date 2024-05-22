/* eslint-disable max-len */
import * as Yup from "yup";

export const TEXT_INPUT_LENGTH = {
  userName: {
    min: 2,
    max: 64,
  },
  password: {
    min: 8,
    max: 2147483647,
  },
};

export const ONLY_SPACES_PATTERN = /^(?!\s+$).+$/;
export const PASSWORD_PATTERN = /^(?!.*\s).{8,128}$/;

const requiredText = "is required";


export const genericValidationSchema = {
  //email
  email: Yup.string()
    .required(`Email ${requiredText}`)
    .email("Email must be valid"),

  //passwords
  password: Yup.string()
    .required(`Password ${requiredText}`)
    .min(
      TEXT_INPUT_LENGTH.password.min,
      `Password must be at least ${TEXT_INPUT_LENGTH.password.min} characters`
    )
    .max(
      TEXT_INPUT_LENGTH.password.max,
      `Password must be maximum ${TEXT_INPUT_LENGTH.password.max} characters`
    )
    .matches(PASSWORD_PATTERN, "Password must not contain whitespaces"),
  repeatPassword: Yup.string()
    .required(`Password confirmation ${requiredText}`)
    .test(
      "arePasswordsEqual",
      "Password and confirmation must be equal",
      function (value, testContext) {
        return value === testContext.parent.password;
      }
    ),
  passwordWithoutTips: Yup.string().required(`Password ${requiredText}`),

  //names
  pseudonym: Yup.string()
    .trim()
    .required(`Username ${requiredText}`)
    .min(
      TEXT_INPUT_LENGTH.userName.min,
      `Username must be at lest ${TEXT_INPUT_LENGTH.userName.min} characters`
    )
    .max(
      TEXT_INPUT_LENGTH.userName.min,
      `Username must be maximum ${TEXT_INPUT_LENGTH.userName.max} characters`
    )
    .matches(ONLY_SPACES_PATTERN, "Username cannot be empty"),
  firstName: Yup.string().trim().required(`First name ${requiredText}`),
  lastName: Yup.string().trim().required(`Last name ${requiredText}`),

  // mix
  bio: Yup.string().trim().required(`Bio ${requiredText}`),
  location: Yup.string().trim().required(`Location ${requiredText}`),
  startLocation: Yup.string()
    .trim()
    .required(`Start location ${requiredText}`),
  tripTypes: Yup.array().required(`Trip type ${requiredText}`),
  author: Yup.array().required(`Author ${requiredText}`),
  climate: Yup.array().required(`Climate ${requiredText}`),
  travelDistance: Yup.array().required(`Travel distance ${requiredText}`),
  specialRequirements: Yup.array().required(`Special requirements ${requiredText}`),
  link: Yup.string().url().required(`Link ${requiredText}`),
  confirmationCode: Yup.string()
    .trim()
    .required(`Confirmation code ${requiredText}`),
  address: Yup.object().shape({
    formattedAddress: Yup.string().required('Address is required'),
    latitude: Yup.number().required('Latitude is required'),
    longitude: Yup.number().required('Longitude is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string(),
    postalCode: Yup.string(),
    country: Yup.string().required('Country is required'),
    geometry: Yup.object().shape({
      type: Yup.mixed<"Point">().oneOf(['Point'])
        .required('Geometry type is required'),
      coordinates: Yup.array()
        .of(Yup.number().required('Coordinate is required'))
        .length(2)
        .required('Coordinates are required'),
    }),
  })
};
