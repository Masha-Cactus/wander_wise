import { ReviewType } from "./ReviewType";
import { TripShortType } from "./TripType";

export type UserType = {
  id: number;
  name: string;
  email: string;
  image: string;
  pseudonym: string;
  description: string;
  location: string;
  sotials: string[];
  colections: TripShortType[];
  saved: TripShortType[];
  trips: TripShortType[];
  reviews: ReviewType[];
  liked: TripShortType[];
};
