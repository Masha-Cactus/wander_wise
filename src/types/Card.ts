import { IComment } from "./Comment";
import { Climate, SpecialRequirements, TripTypes } from "./Filters";

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
  tripTypes: TripTypes[],
  climate: Climate,
  specialRequirements: SpecialRequirements[],
}

export type CardWithoutDistance = Omit<ICard, 'distance'>;