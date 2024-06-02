import axios from "axios";
import { useSession } from "next-auth/react";

export const AxiosInstance = (token: string) => {
  // Create a new Axios instance with baseURL and default configurations
  const instance = axios.create({
    baseURL: process.env.SERVER_BASE_URL || "http://localhost:4000",
    timeout: 60000, // Set timeout to 60 seconds
    headers: {
      // "Content-Type": "application/json",
      // "Access-Control-Allow-Origin": "*", // Allow CORS
    },
  });

  // Add a request interceptor to include the token in requests
  instance.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Add a response interceptor to handle errors
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      return Promise.reject(error);
    }
  );

  // Return the custom Axios instance
  return instance;
};
