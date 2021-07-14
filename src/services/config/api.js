import axios from "axios";

export const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

api.interceptors.request.use(async (config) => {
  const draftConfig = { ...config };

  const idToken = localStorage.getItem("idToken")?.replaceAll("\"", "");

  draftConfig.headers = {
    authorization: `Bearer ${idToken}`,
  };

  return draftConfig;
});
