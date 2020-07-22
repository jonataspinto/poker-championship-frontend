import { api } from "./api";

export const authentication = async (player) => {
  const response = await api.post("players", { ...player });

  return response.data;
};
