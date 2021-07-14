import { api } from "./config";

export const createNewJourney = async (journeyData) => {
  const response = await api.post(
    "/journeys",
    { ...journeyData },
  );

  return response.data;
};

export const getAllJourneys = async () => {
  const response = await api.get(
    "/journeys",
  );

  return response.data;
};

export const getJourney = async (id) => {
  const response = await api.get(
    `/journeys/${id}`,
  );

  return response.data;
};

export const updateJourney = async (journeyData) => {
  const { id, ...rest } = journeyData;

  const response = await api.put(
    `/journeys/${id}`,
    { ...rest },
  );

  return response.data;
};

export const closeJourney = async (journeyId) => {
  const response = await api.put(
    `/journeys/close/${journeyId}`,
    {},
  );

  return response.data;
};
