/* eslint-disable max-len */
// eslint-disable-next-line max-len
export const PWD_REGEX
  = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]){7,24}/;
export const pseudonym_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{5,23}/;

export const IMAGES_SLIDES = [
  "/images/start_1.png",
  "/images/start_2.png",
  "/images/start_3.png",
  "/images/start_4.png",
  "/images/start_5.png",
  "/images/start_6.png",
];

export const FILTER_PRESETS = [
  "Rest with family",
  "Fun with friends",
  "History places",
  "Art galleries",
];

export const ApiRoutes = {
  USER: "/users",
  SOCIAL_LINKS: "/social-links",
  COMMENTS: "/comments",
  COLLECTIONS: "/collections",
  CARDS: "/cards",
};

export const CARDS_PER_PAGE = 8;
