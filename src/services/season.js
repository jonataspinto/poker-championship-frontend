import { formatDateToIso } from "../utils";
import { api } from "./config";

export const createNewSeason = async (seasonData) => {
  const response = await api.post(
    "/seasons",
    {
      ...seasonData,
      createdAt: formatDateToIso(new Date())
    },
  );

  return response.data;
};

export const getAllSeasons = async () => {
  const response = await api.get(
    "/seasons",
  );

  return response.data;
};

export const getSeason = async (id) => {
  const response = await api.get(
    `/seasons/${id}`,
  );

  return response.data;
};

export const updateSeason = async (seasonData) => {
  const { id, ...rest } = seasonData;

  const response = await api.put(
    `/seasons/${id}`,
    { ...rest },
  );

  return response.data;
};

export const closeSeason = async (seasonId) => {
  const response = await api.put(
    `/seasons/close/${seasonId}`,
    {},
  );

  return response.data;
};
