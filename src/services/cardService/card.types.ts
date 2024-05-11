import { 
  CardAuthorsType, 
  ClimateType, 
  SpecialRequirementsType, 
  TravelDistanceType, 
  TripTypesType 
} from "@/src/types/Filters";

export interface ICreateCard {
  name: string,
  populatedLocality: string,
  region: string,
  country: string,
  continent: string,
  tripTypes: TripTypesType[],
  climate: ClimateType,
  specialRequirements: SpecialRequirementsType[],
  description: string,
  whyThisPlace: string[],
  imageLinks: string[],
  mapLink: string,
}

export interface IUpdateCard extends ICreateCard {
  id: number,
}

export interface IAddCardImages {
  id: number,
  images: File[],
}

export interface ISearchCard {
  author: CardAuthorsType[],
  startLocation: string,
  tripTypes: TripTypesType[],
  climate: ClimateType[],
  specialRequirements: SpecialRequirementsType[],
  travelDistance: TravelDistanceType[],
}