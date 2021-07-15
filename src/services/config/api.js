/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import axios from "axios";
import { LogOutGoogle, RefreshIdToken } from "../authentication";

export const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

api.interceptors.request.use(async (config) => {
  const idToken = localStorage.getItem("idToken")?.replaceAll("\"", "");

  if (idToken) {
    config.headers.Authorization = `Bearer ${idToken}`;
  }

  return config;
});

api.interceptors.response.use((config) => config, async (error) => {
  const originalRequest = error.config;

  if (error?.response?.data?.code === "auth/id-token-expired" && !originalRequest._retry) {
    originalRequest._retry = true;

    await RefreshIdToken(({ status }) => {
      if (status === "success") {
        return api(originalRequest);
      }
      LogOutGoogle();
    });
  }

  if (error?.response?.data?.code === "auth/argument-error" && !originalRequest._retry) {
    originalRequest._retry = true;

    await RefreshIdToken(({ status }) => {
      if (status === "success") {
        return api(originalRequest);
      }
      LogOutGoogle();
    });
  }
});
