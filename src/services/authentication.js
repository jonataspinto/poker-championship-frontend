import { api } from "./api";

export const register = async (player) => {
  const response = await api.post("users", { ...player });
  return response.data;
};

export const authenticate = async (data) => {
  const response = await api.get(
    "user-by-key",
    { params: {
      ...data
      }
    }
  );

  return response.data;
};

