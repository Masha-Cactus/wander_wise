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
};

export const ONLY_SPACES_PATTERN = /^(?!\s+$).+$/;
export const EMAIL_PATTERN
  = /^[a-zA-Z0-9!#$%&'*+\\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+\\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/;

