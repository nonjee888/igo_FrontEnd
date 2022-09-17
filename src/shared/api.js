import axios from "axios";

export const instance = axios.create({
  baseURL: "",
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  // const refreshToken = localStorage.getItem("refresh-token");
  config.headers.Authorization = token;
  // config.headers.refreshToken = refreshToken;
  return config;
});
