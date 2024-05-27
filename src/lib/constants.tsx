import { 
  CardAuthors, 
  Climate, 
  SpecialRequirements, 
  TravelDistance, 
  TripTypes 
} from "@/src/services";

export const SLIDER_IMAGES = [
  "/slider-images/1.png",
  "/slider-images/2.png",
  "/slider-images/3.png",
  "/slider-images/4.png",
  "/slider-images/5.png",
  "/slider-images/6.png",
];

export const ApiRoutes = {
  USER: "/users",
  SOCIAL_LINKS: "/social-links",
  COMMENTS: "/comments",
  COLLECTIONS: "/collections",
  CARDS: "/cards",
};

export const CARDS_PER_PAGE = 9;
export const SITE_NAME = 'Wander Wise';

export const ATMOSPHERES = Object.values(TripTypes);
export const CLIMATES = Object.values(Climate);
export const SPECIALS = Object.values(SpecialRequirements);
export const AUTHORS = Object.entries(CardAuthors);
export const DISTANCE = Object.entries(TravelDistance);
