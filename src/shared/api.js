import axios from "axios";

export const instance = axios.create({
  baseURL: "http://43.200.183.126:8080/",
});

instance.interceptors.request.use((config) => {
  const ACCESS_TOKEN = config.headers.authorization;
  const REFRESH_TOKEN = config.headers.refreshtoken;
  localStorage.setItem("token", ACCESS_TOKEN); //로컬스토리지에 토큰저장
  localStorage.setItem("refresh", REFRESH_TOKEN); //로컬스토리지에 토큰저장
  return config;
});
