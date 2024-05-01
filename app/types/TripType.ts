export type TripShortType = {
  id: number;
  name: string;
  image: string;
  author: string;
};

export type TripLongType = {
  id: number;
  name: string;
  image: string;
  images: string[];
  author: string;
  description: string;
  distance: string;
  likes: number;
  location: string;
  mapLink: string;
  whyThisPlace: string;
  coments: []
};
