import { 
  CardAuthors, 
  Climate, 
  SpecialRequirements, 
  TravelDistance, 
  TripTypes 
} from "@/src/services";

export const ATMOSPHERES = Object.values(TripTypes);
export const CLIMATES = Object.values(Climate);
export const SPECIALS = Object.values(SpecialRequirements);
export const AUTHORS = Object.entries(CardAuthors);
export const DISTANCE = Object.entries(TravelDistance);