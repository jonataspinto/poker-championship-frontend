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
