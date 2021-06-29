import { api } from "./api";
import { GetStorageUser } from ".";

export const getAllPlayers = async () => {
  const user = await GetStorageUser();

  const response = await api.get(
    "/users",
    {
      headers: {
        authorization: `Bearer ${user.idToken}`,
      },
    },
  );

  return response.data;
};

export const getPlayerData = async (id) => {
  const user = await GetStorageUser();

  const response = await api.get(
    `/users/${id}`,
    {
      headers: {
        authorization: `Bearer ${user.idToken}`,
      },
    },
  );

  return response.data;
};

export const getPlayerByKey = async (key = "uuid", value) => {
  const user = await GetStorageUser();

  const response = await api.get(
    "/user-by-key/",
    {},
    {
      headers: {
        authorization: `Bearer ${user.idToken}`,
      },
      params: {
        key,
        value,
      },
    },
  );

  return response.data;
};

export const updatePlayerProfile = async (playerData) => {
  const user = await GetStorageUser();

  const { id, ...rest } = playerData;

  const response = await api.put(
    `/users/${id}`,
    { ...rest },
    {
      headers: {
        authorization: `Bearer ${user.idToken}`,
      },
    },
  );

  return response.data;
};
