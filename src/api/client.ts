import axios, { CreateAxiosDefaults } from "axios";

const BASE_URL = 'http://3.91.160.29:8088/api';

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