import Axios from 'axios';
import type { AxiosInstance } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;

export const TEMP_BASE_URL = 'https://71e0-102-67-1-62.eu.ngrok.io';

export const axios = Axios.create({
  baseURL: API_BASE_URL,
});

export const setAxiosDefaultToken = (
  token: string,
  axiosInstance: AxiosInstance,
) => {
  axiosInstance.defaults.headers.common.Authorization = `Token ${token}`;
};

export const deleteAxiosDefaultToken = () => {
  delete axios.defaults.headers.common['Authorization'];
};
