import { AxiosError } from "axios";
import { 
  CardAuthorsType, 
  ICard, 
  IFilterParams,
  TripTypesType,
  SpecialRequirementsType,
  ClimateType,
} from "@/src/services";
import { Routes } from "@/src/lib/constants";

export const trimObjectFields = <T>(object: T): T => {
  const jsonString = JSON.stringify(object, (_, value) =>
    typeof value === "string" ? value.trim() : value
  );

  return JSON.parse(jsonString);
};

interface PartialServerErrorResponse {
  exception?: {
    message: string,
  }
}

export const normalizeError = (error: AxiosError): string => {
  const errorResponse = error?.response?.data as PartialServerErrorResponse;

  if (errorResponse && errorResponse.exception?.message) {
    return errorResponse?.exception?.message;
  }

  if (error.message) {
    return error.message;
  }

  return "Unexpected server error";
};

export const getFilteredCards 
= (cards: ICard[], filterParams: IFilterParams) => {
  return cards.filter(card => {
    const isTripType = !filterParams.tripTypes.length 
      || card.tripTypes.some(tripType => 
        filterParams.tripTypes.includes(tripType));
    const isClimate = !filterParams.climates.length 
      || filterParams.climates.includes(card.climate);
    const isCountry = !filterParams.countries.length 
      || filterParams.countries.includes(card.whereIs.split(',')[2].trim());
    const isSpecial = !filterParams.specialRequirements.length 
      || card.specialRequirements
        .some(special => filterParams.specialRequirements.includes(special));
    const isAuthor = !filterParams.authors.length 
      || filterParams.authors.includes(card.author as CardAuthorsType);
  
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
    (acc, curr) => [...acc, curr.whereIs.split(', ')[2].trim()], 
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
  const [datePart, timePart] = date.split(' ');
  const [day, month, year] = datePart.split('.').map(Number);
  const [hours, minutes, seconds] = timePart.split(':').map(Number);

  const timestamp = new Date(year, month - 1, day, hours, minutes, seconds)
    .getTime();
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

export const getPrevPage = (currPathname: string) => {
  let name = 'Back';
  let link = '';

  switch (true) {
    case currPathname.startsWith('/trips'):
      name = 'Back to cards';
      link = Routes.TRIPS;
      break;
    case currPathname.startsWith('/my-cards'):
      name = 'Back to cards';
      link = Routes.MY_CARDS.MAIN;
      break;
    case currPathname.startsWith('/profile'):
      name = 'Back to profile';
      link = Routes.PROFILE.MAIN;
      break; 
    case currPathname.startsWith('/saved'):
      const isInCollections = currPathname === '/saved/collections';

      name = isInCollections ? 'Back to saved' : 'Back to my collections';
      link = isInCollections ? Routes.SAVED : Routes.COLLECTIONS.MAIN;
      break;
    
    default:
      break;
  } 

  return { name, link };
};