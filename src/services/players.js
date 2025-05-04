import { api } from "./config";

export const createPlayer = async (playerData) => {
  const response = await api.post("users", { ...playerData });
  return response.data;
};

export const getAllPlayers = async () => {
  const response = await api.get("/players");

  return response.data;
};

export const getPlayerData = async (id) => {
  const response = await api.get(`/players/${id}`);

  return response.data;
};

export const updatePlayerProfile = async (playerData) => {
  const { id, ...rest } = playerData;

  const response = await api.put(`/users/${id}`, { ...rest });

  return response.data;
};
