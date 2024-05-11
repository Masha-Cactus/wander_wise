import {
  ClimateType,
  IComment,
  SpecialRequirements,
  SpecialRequirementsType,
  TripTypes,
  TripTypesType,
} from "@/src/services";

export interface IShortCard {
  id: number;
  name: string;
  author: string;
  tripTypes: TripTypesType[];
}

export interface ICard extends IShortCard {
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

export interface IReportCard {
  cardId: number;
  text: string;
}

export interface IAddImages {
  cardId: number;
  images: File[];
}

