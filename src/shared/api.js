import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_MAIN_HOST,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  const refreshtoken = localStorage.getItem("REFRESH_TOKEN");
  config.headers.authorization = token;
  config.headers.refreshtoken = refreshtoken;
  return config;
});
