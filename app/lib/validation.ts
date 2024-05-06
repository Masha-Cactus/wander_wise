/* eslint-disable max-len */
export const TEXT_INPUT_LENGTH = {
  userName: {
    min: 2,
    max: 64,
  },
  password: {
    min: 8,
    max: 128,
  },
  slug: {
    min: 2,
    max: 50,
  },
  projectName: {
    min: 2,
    max: 30,
  },
  projectDescription: {
    max: 500,
  },
  customerDetails: {
    taxId: {
      min: 2,
      max: 64,
    },
    name: {
      min: 2,
      max: 64,
    },
    line1: {
      min: 2,
      max: 128,
    },
    line2: {
      min: 2,
      max: 128,
    },
    state: {
      min: 2,
      max: 64,
    },
    city: {
      min: 2,
      max: 64,
    },
    postalCode: {
      min: 2,
      max: 32,
    },
  },
  promoCode: {
    min: 2,
  },
};

export const ONLY_SPACES_PATTERN = /^(?!\s+$).+$/;
export const EMAIL_PATTERN
  = /^[a-zA-Z0-9!#$%&'*+\\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+\\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/;

