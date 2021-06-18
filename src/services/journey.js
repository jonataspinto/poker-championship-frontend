import { GetStorageUser } from "../config/firebase";
import { api } from "./api";

export const createNewJourney = async (journeyData) => {
  const user = await GetStorageUser();

  const response = await api.post(
    "/journeys",
    {...journeyData},
    {
      headers: {
        authorization: `Bearer ${user.idToken}`
      }
    }
  );

  return response.data;
};

export const getAllJourneys = async () => {
  const user = await GetStorageUser()

  const response = await api.get(
    "/journeys",
    {
      headers: {
        authorization: `Bearer ${user.idToken}`
      }
    }
  );

  return response.data;
};

export const getJourney = async (id) => {
  const user = await GetStorageUser()

  const response = await api.get(
    `/journeys/${id}`,
    {
      headers: {
        authorization: `Bearer ${user.idToken}`
      }
    }
  );

  return response.data;
};

export const updateJourney = async (journeyData) => {
  const user = await GetStorageUser();

  const { id, ...rest } = journeyData;

  const response = await api.put(
    `/journeys/${id}`,
    {...rest},
    {
      headers: {
        authorization: `Bearer ${user.idToken}`
      }
    }
  );

  return response.data;
}

export const closeJourney = async (journeyData) => {
  const user = await GetStorageUser();

  const { id } = journeyData;

  const response = await api.put(
    `/journeys/${id}`,
    {},
    {
      headers: {
        authorization: `Bearer ${user.idToken}`
      }
    }
  );

  return response.data;
}
