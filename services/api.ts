import axios, { AxiosInstance } from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const api: AxiosInstance = axios.create({
  baseURL: apiUrl,
});
