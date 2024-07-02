import { 
  IComment,
  CardAuthorsType, 
  ClimateType, 
  SpecialRequirementsType, 
  TravelDistanceType, 
  TripTypesType 
} from "@/src/services";

export interface ICard {
  id: number;
  name: string;
  author: string;
  tripTypes: TripTypesType[];
  whereIs: string;
  description: string;
  whyThisPlace: string[];
  imageLinks: string[];
  latitude: number;
  longitude: number;
  mapLink: string;
  distance: number;
  likes: number;
  comments: IComment[];
  shown: boolean;
  climate: ClimateType;
  specialRequirements: SpecialRequirementsType[];
}
export interface ICreateCard {
  name: string,
  populatedLocality: string,
  region?: string,
  country: string,
  continent?: string,
  tripTypes: TripTypesType[],
  climate: ClimateType,
  specialRequirements: SpecialRequirementsType[],
  description: string,
  whyThisPlace: string[],
  imageLinks?: string[],
  mapLink: string,
}

export interface IUpdateCard extends ICreateCard {
  id: number,
}

export interface IReportCard {
  cardId: number;
  text: string;
}

export interface IAddCardImages {
  id: number,
  images: FormData,
}

export interface ISearchCard {
  author: CardAuthorsType[],
  startLocation: string,
  tripTypes: TripTypesType[],
  climate: ClimateType[],
  specialRequirements: SpecialRequirementsType[],
  travelDistance: TravelDistanceType[],
}

export interface ISearchCardResponse {
  currentPage: number,
  cards: ICard[],
}
