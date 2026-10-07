import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

const BASE_URL = "https://project-favorite-01-be.onrender.com/api";

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const refreshApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

interface RetryConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as RetryConfig | undefined;

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      await refreshApi.post("/auth/refresh");

      return api(originalRequest);
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }
  },
);