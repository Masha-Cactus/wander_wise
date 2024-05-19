import { AxiosError } from "axios";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { 
  CardAuthorsType, 
  ICard, 
  IFilterParams,
  TripTypesType,
  SpecialRequirementsType,
  ClimateType,
} from "@/src/services";

export const isTokenAlive = (expirationTime: number) => {
  const currentTime = Date.now();

  return currentTime <= expirationTime;
};

export const tokenExpiresIn = (token: string) => {
  if (token) {
    const decoded = jwtDecode<JwtPayload>(token);
    const expirationTime = decoded.exp || 0;

    // convert from seconds to milliseconds
    const expirationTimeInMilliSeconds = expirationTime * 1000;

    return expirationTimeInMilliSeconds;
  }

  return 0;
};

export const getPlainObject = <T>(object: T): T =>
  JSON.parse(JSON.stringify(object));

export const trimObjectFields = <T>(object: T): T => {
  const jsonString = JSON.stringify(object, (_, value) =>
    typeof value === "string" ? value.trim() : value
  );

  return JSON.parse(jsonString);
};

export const normalizeError = (error: AxiosError): string => {
  const errorResponse = error?.response?.data;

  if (typeof errorResponse === "object" && errorResponse !== null) {
    // get array of errors
    const errorMessages = Object.values(errorResponse) as string[];

    // normalize that array and join to string
    const normalizedErrorMessage = errorMessages
      .map((errorMessage) =>
        Array.isArray(errorMessage) ? errorMessage.join(" ") : errorMessage
      )
      .join(" ");

    return normalizedErrorMessage;
  }

  return "Unexpected error";
};

export const getFilteredCards 
= (cards: ICard[], filterParams: IFilterParams) => {
  return cards.filter(card => {
    const isTripType = card.tripTypes
      .some(tripType => filterParams.tripTypes.includes(tripType));
    const isClimate = filterParams.climates.includes(card.climate);
    const isCountry = filterParams.countries
      .includes(card.whereIs.split(',')[1].trim());
    const isSpecial = card.specialRequirements
      .some(special => filterParams.specialRequirements.includes(special));
    const isAuthor = filterParams.authors
      .includes(card.author as CardAuthorsType);
  
    return isTripType && isClimate && isCountry && isSpecial && isAuthor;
  }
  );
};

export const getFilterOptions = (cards: ICard[]) => {
  const cardsTypes = cards.reduce(
    (acc, curr) => [...acc, ...curr.tripTypes], 
    [] as TripTypesType[]
  );
  
  const cardsSpecials = cards.reduce(
    (acc, curr) => [...acc, ...curr.specialRequirements], 
    [] as SpecialRequirementsType[]
  );
  
  const cardsClimates = cards.reduce(
    (acc, curr) => [...acc, curr.climate], 
    [] as ClimateType[]
  );
  
  const cardsAuthors = cards.reduce(
    (acc, curr) => [...acc, curr.author] as CardAuthorsType[], 
    [] as CardAuthorsType[]
  );
  
  const cardsCountries = cards.reduce(
    (acc, curr) => [...acc, curr.whereIs.split(',')[1].trim()], 
    [] as string[]
  );
  
  return {
    countries: cardsCountries,
    tripTypes: cardsTypes,
    specialRequirements: cardsSpecials,
    climates: cardsClimates,
    authors: cardsAuthors,
  };
};

export function getDaysAgo(date: string) {
  const timestamp = new Date(date).getTime();
  const now = new Date().getTime();
  const timeDiff = now - timestamp;
  const oneDay = 24 * 60 * 60 * 1000;

  if (timeDiff < oneDay) {
    return 'today';
  } else {
    const daysAgo = Math.floor(timeDiff / oneDay);

    return `${daysAgo} days ago`;
  }
}