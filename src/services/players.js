import { api } from "./api";

export const getAllPlayers = async () => {
  const response = await api.get("/users");
  return response.data;
};

