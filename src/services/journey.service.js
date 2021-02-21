import { api } from "./api";

export const fetch = async () => {
  const response = await api.get("/journey");
  // console.log(response.data.data);
  return response.data.data;
};

export const create = async () => {
  const response = await api.post("/journey");
  console.log(response);
  return response.data;
};
