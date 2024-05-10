export enum TripTypes {
  active = 'Active',
  chill = 'Chill',
  native = 'Native culture',
  family = 'Family',
  culture = 'Culture',
  spiritual = 'Spiritual',
  extreme = 'Extreme',
  corporate = 'Corporate',
  nature = 'Nature',
  shopping = 'Shopping',
  romantic = 'Romantic',
  party = 'Party',
}

export type TripTypesType = `${TripTypes}`;
  
export enum Climate {
  polar = 'Polar',
  temperate = 'Temperate',
  tropical = 'Tropical',
}

export type ClimateType = `${Climate}`;
  
export enum SpecialRequirements {
  pets = 'With pets',
  kids = 'With kids',
  queer = 'Queer friendly',
  disability = 'Disability',
}

export type SpecialRequirementsType = `${SpecialRequirements}`;