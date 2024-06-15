import axios, { CreateAxiosDefaults } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const createClient = (additionalConfig?: CreateAxiosDefaults) => {
  const config = {
    baseURL: BASE_URL,
    withCredentials: true,
  };

  if (additionalConfig) {
    Object.assign(config, additionalConfig);
  }
      
  return axios.create(config);
};