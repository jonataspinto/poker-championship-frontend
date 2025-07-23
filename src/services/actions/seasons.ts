"use server";

import { SeasonsRepository } from "@/server/repositories/SeasonsRepository";
import { SeasonController } from "@/server/controllers/SeasonController";
import { FirestoreAdapterDB } from "../database";

const seasonsRepository = new SeasonsRepository(
  new FirestoreAdapterDB("seasons")
);

const seasonController = new SeasonController(seasonsRepository);

export async function listSeasons() {
  try {
    const data = await seasonController.index();

    return data;
  } catch (error) {
    console.error("Error fetching seasons:", error);
    return [];
  }
}

export async function getSeasonById(id: string) {
  try {
    const data = await seasonController.show(id);

    return data;
  } catch (error) {
    console.error(`Error fetching season with id ${id}:`, error);
    return {};
  }
}

export async function createSeason(data: Pick<Season, "title">) {
  try {
    const newSeason = await seasonController.store({
      ...data,
      hasClosed: false,
      journeys: [],
      rounds: [],
      tag: 0
    });

    return newSeason;
  } catch (error) {
    console.error("Error creating season:", error);
    throw error;
  }
}

export async function closeSeason(closedBy: string) {
  return seasonController.closeSeason(closedBy);
}

export async function updateSeason(id: string, data: Partial<Season>) {
  return seasonController.update(id, data as Season);
}

export async function createNewRound(
  seasonId: string,
  data: Pick<Round, "players">
) {
  if (!seasonId) {
    throw new Error("Season ID is required to create a new round.");
  }

  const season = await seasonController.show(seasonId);

  if (!season) {
    throw new Error(`Season with ID ${seasonId} not found.`);
  }

  const currentTag = season?.rounds?.length ?? 0;

  const { MAX_ROUNDS_PER_SEASON } = await import("@/utils/constants");

  if (currentTag === MAX_ROUNDS_PER_SEASON) {
    throw new Error("Maximum number of rounds reached for this season.");
  }

  const newRound = {
    ...data,
    tag: currentTag + 1,
    hasClosed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    id: crypto.randomUUID()
  };

  season.rounds!.push(newRound);

  return seasonController.update(seasonId, season);
}
