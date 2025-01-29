import axios, { AxiosInstance } from "axios";

// BASE_URL_LOCAL=http://127.0.0.1:8000
// BASE_URL_WLDBUD=http://192.168.2.211:8000
// BASE_URL_MOBILE=http://172.20.10.5:8000
// BASE_URL_PRODUCTION=http://18.119.118.178:8000
// BASE_URL_COMPUTEMP=http://192.168.2.215:8000

interface CustomAxiosInstance extends AxiosInstance {
  setAuthToken: (token: string) => void;
}

const api: CustomAxiosInstance = axios.create({
  baseURL: 'http://192.168.2.215:8000',
  headers: {
    "Content-Type": "application/json",
  },
}) as CustomAxiosInstance;

api.setAuthToken = (token: string) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const apiWithoutAuth = axios.create({
  baseURL: 'http://192.168.2.215:8000',
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
