/* eslint-disable max-len */
import * as Yup from "yup";
import { CardAuthors, Climate, SpecialRequirements, TravelDistance, TripTypes } from "@/src/services";

export const TEXT_INPUT_LENGTH = {
  userName: {
    min: 2,
    max: 64,
  },
  password: {
    min: 8,
    max: 2147483647,
  },
  cardAndCollectionName: {
    min: 3,
    max: 50,
  }
};

export const ONLY_SPACES_PATTERN = /^(?!\s+$).+$/;
export const PASSWORD_PATTERN = /^(?!.*\s).{8,128}$/;
const GOOGLE_MAPS_LINK_PATTERN = /^https:\/\/(www\.)?(google\.com\/maps\/place\/|maps\.app\.goo\.gl\/)/i;

const requiredText = "is required";


export const genericValidationSchema = {
  email: Yup.string()
    .required(`Email ${requiredText}`)
    .email("Email must be valid"),
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
  pseudonym: Yup.string()
    .trim()
    .required(`Username ${requiredText}`)
    .min(
      TEXT_INPUT_LENGTH.userName.min,
      `Username must be at least ${TEXT_INPUT_LENGTH.userName.min} characters`
    )
    .max(
      TEXT_INPUT_LENGTH.userName.max,
      `Username must be maximum ${TEXT_INPUT_LENGTH.userName.max} characters`
    )
    .matches(ONLY_SPACES_PATTERN, "Username cannot be empty"),
  
  firstName: Yup.string().trim(),
  lastName: Yup.string().trim(),
  description: Yup.string().trim().max(5000, 'Description may be maximum 5000 characters'),
  name: Yup.string().trim()
    .required(`Name ${requiredText}`)
    .min(
      TEXT_INPUT_LENGTH.cardAndCollectionName.min,
      `Name must be at least ${TEXT_INPUT_LENGTH.cardAndCollectionName.min} characters`
    )
    .max(
      TEXT_INPUT_LENGTH.cardAndCollectionName.max,
      `Name must be maximum ${TEXT_INPUT_LENGTH.cardAndCollectionName.max} characters`
    ),
  tripTypes: Yup.array().required(`Trip type ${requiredText}`)
    .of(Yup.string().trim()
      .oneOf(Object.values(TripTypes)).required()),
  author: Yup.array().required(`Author ${requiredText}`)
    .of(Yup.string().trim()
      .oneOf(Object.values(CardAuthors)).required()),
  climateString: Yup.string().trim()
    .transform((val, orig) => orig === "" ? undefined : val)
    .required('Climate is required')
    .oneOf(Object.values(Climate)),
  climateArray: Yup.array().required(`Climate ${requiredText}`)
    .of(Yup.string().trim()
      .oneOf(Object.values(Climate)).required()),
  whyThisPlace: Yup.array().required(`This field ${requiredText}`)
    .min(1, 'You must provide at least one reason')
    .of(Yup.string().trim().required()),
  travelDistance: Yup.string().trim()
    .oneOf(Object.values(TravelDistance)).required(`Travel distance ${requiredText}`),
  specialRequirements: Yup.array().required(`Special requirements ${requiredText}`)
    .of(Yup.string().trim()
      .oneOf(Object.values(SpecialRequirements)).required()),
  link: Yup.string().url().required(`Link ${requiredText}`),
  mapLink: Yup
    .string()
    .required('Google Maps link is required')
    .url('Must be a valid URL')
    .matches(GOOGLE_MAPS_LINK_PATTERN, 'A valid Google Maps link must start with "https://google.com/maps/place/" or "https://maps.app.goo.gl/"'),
  confirmationCode: Yup.string()
    .trim()
    .required(`Confirmation code ${requiredText}`),
  address: Yup.object().shape({
    formattedAddress: Yup.string(),
    latitude: Yup.number().required(),
    longitude: Yup.number().required(),
    city: Yup.string(),
    state: Yup.string(),
    postalCode: Yup.string(),
    country: Yup.string(),
    geometry: Yup.object().shape({
      type: Yup.mixed<"Point">().oneOf(['Point'])
        .required(),
      coordinates: Yup.array()
        .of(Yup.number().required())
        .length(2)
        .required(),
    }),
  }),
  arrayPossiblyEmpty: Yup.array().required('This field is required'),
};
