import {
  ClimateType,
  IComment,
  SpecialRequirements,
  SpecialRequirementsType,
  TripTypes,
  TripTypesType,
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
  fullName: string;
  tripTypes: TripTypes[];
  climate: ClimateType;
  specialRequirements: SpecialRequirements[];
  description: string;
  whyThisPlace: string[];
  imageLinks: string[];
  mapLink: string;
}

export interface IUpdateCard {
  cardId: number;
  data: ICreateCard;
}

export interface IReportCard {
  cardId: number;
  text: string;
}

export interface IAddImages {
  cardId: number;
  images: File[];
}

