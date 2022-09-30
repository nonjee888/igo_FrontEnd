import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_MAIN_HOST,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("ACCESS_TOKEN"); //로컬스토리지에 토큰저장
  const refreshtoken = localStorage.getItem("REFRESH_TOKEN"); //로컬스토리지에 토큰저장
  config.headers.authorization = token;
  config.headers.refreshtoken = refreshtoken;
  return config;
});
