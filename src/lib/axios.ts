import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { APIError } from "@/lib/api/errors";

interface ErrorResponse {
  message?: string;
  error?: string;
}

const api = axios.create({
  baseURL: "/api",
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("auth-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  () => {
    return Promise.reject(new APIError("Request failed", 500));
  }
);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ErrorResponse>) => {
    if (error.response?.status === 401) {
      Cookies.remove("auth-token");
      window.location.href = "/login";
      return Promise.reject(new APIError("Unauthorized", 401));
    }

    if (error.response?.status === 404) {
      return Promise.reject(new APIError("Resource not found", 404));
    }

    if (error.response?.status === 422) {
      return Promise.reject(
        new APIError("Validation failed", 422, "VALIDATION_ERROR")
      );
    }

    return Promise.reject(
      new APIError(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "An unexpected error occurred",
        error.response?.status || 500
      )
    );
  }
);

export default api;
