import axios from "axios";

const isDevelopment = import.meta.env.MODE === "development";
const defaultBaseUrl = isDevelopment ? "http://localhost:5001/api" : "/api";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || defaultBaseUrl,
  withCredentials: true,
});
