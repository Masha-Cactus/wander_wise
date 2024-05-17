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
  mapLink: string;
  distance: number;
  likes: number;
  comments: IComment[];
  shown: boolean;
  climate: ClimateType;
  specialRequirements: SpecialRequirementsType[];
}
export interface ICreateCard {
  fullName: string,
  tripTypes: string,
  climate: ClimateType,
  specialRequirements: string,
  description: string,
  whyThisPlace: string,
  imageLinks: string,
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
