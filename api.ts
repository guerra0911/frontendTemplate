import axios, { AxiosInstance } from "axios";
import { BASE_URL_LAPTOP } from "@env";

interface CustomAxiosInstance extends AxiosInstance {
  setAuthToken: (token: string) => void;
}

const api: CustomAxiosInstance = axios.create({
  baseURL: BASE_URL_LAPTOP,
  headers: {
    "Content-Type": "application/json",
  },
}) as CustomAxiosInstance;

api.setAuthToken = (token: string) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const apiWithoutAuth = axios.create({
  baseURL: BASE_URL_LAPTOP,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
