export const SLIDER_IMAGES = [
  "/slider-images/1.png",
  "/slider-images/2.png",
  "/slider-images/3.png",
  "/slider-images/4.png",
  "/slider-images/5.png",
  "/slider-images/6.png",
];

export const Routes = {
  HOME: "/",
  PROFILE: {
    MAIN: "/profile",
    EDIT: "/profile/edit",
  },
  TRIPS: "/trips",
  TRIP: (id: number) => `/trips/${id}`,
  MY_CARDS: {
    MAIN: "/my-cards",
    CREATE: "/my-cards/create",
    EDIT: (id: number) => `/my-cards/edit/${id}`,
  },
  SAVED: "/saved",
  COLLECTIONS: {
    MAIN: "/saved/collections",
    CREATE: "/saved/collections/create",
  },
  COLLECTION: (id: number) => `/saved/collections/${id}`,
  NOT_FOUND: "/404",
};

export const ApiEndpoints = {
  USERS: "/users",
  COLLECTIONS: "/collections",
  CARDS: "/cards",
  COMMENTS: "/comments",
  SOCIAL_LINKS: "/social-links",
  AUTH: "/auth",
};

export const CARDS_PER_PAGE = 12;
export const CARD_IMAGES_LIMIT = 10;
export const SITE_NAME = 'Wander Wise';
