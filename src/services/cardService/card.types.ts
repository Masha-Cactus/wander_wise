import { Climate, SpecialRequirements, TripTypes } from "@/src/types/Filters";

export interface ICreateCard {
  name: string,
  populatedLocality: string,
  region: string,
  country: string,
  continent: string,
  tripTypes: TripTypes[],
  climate: Climate,
  specialRequirements: SpecialRequirements[],
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