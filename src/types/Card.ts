import { IComment } from "./Comment";
import { ClimateType, SpecialRequirementsType, TripTypesType } from "./Filters";

export interface ICard {
  id: number,
  name: string,
  author: string,
  whereIs: string,
  description: string,
  whyThisPlace: string[],
  imageLinks: string[],
  mapLink: string,
  distance: number,
  likes: number,
  comments: IComment[],
  shown: boolean,
  tripTypes: TripTypesType[],
  climate: ClimateType,
  specialRequirements: SpecialRequirementsType[],
}

export type CardWithoutDistance = Omit<ICard, 'distance'>;