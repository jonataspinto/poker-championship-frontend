"use server";

import { revalidateTag } from "next/cache";
import { auth } from "@/auth";
import { JourneysRepository } from "@/server/repositories/JourneysRepository";
import { FirestoreAdapterDB } from "../database";
import { PlayersRepository } from "@/server/repositories/PlayersRepository";
import { JourneyTagsRepository } from "@/server/repositories/JourneyTagsRepository";
import { SeasonsRepository } from "@/server/repositories/SeasonsRepository";
import { JourneyController } from "@/server/controllers/JourneyController";

const journeysRepository = new JourneysRepository(
  new FirestoreAdapterDB("journeys")
);

const playersRepository = new PlayersRepository(
  new FirestoreAdapterDB("users")
);

const journeyTagsRepository = new JourneyTagsRepository(
  new FirestoreAdapterDB("journey-tags")
);

const seasonsRepository = new SeasonsRepository(
  new FirestoreAdapterDB("seasons")
);

const journeyController = new JourneyController(
  journeysRepository,
  playersRepository,
  journeyTagsRepository,
  seasonsRepository
);

export async function listJourneys(query?: URLSearchParams) {
  try {
    const playerId = query?.get("playerId") ?? "";

    const journeys = await journeyController.index(playerId);

    return journeys;
  } catch (error) {
    console.log("🚀 ~ listJourneys ~ error:", error);
    return [];
  }
}

export async function getJourneyById(id: string) {
  const journey = await journeyController.show(id);

  if (!journey) {
    throw new Error(`Journey with id ${id} not found`);
  }

  return journey;
}

export async function updateJourney(id: string, payload: Partial<Journey>) {
  return journeyController.update(id, payload);
}

export async function closeJourney(id: string) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      throw new Error("User not authenticated");
    }

    const data = await journeyController.closeJourney(id, session?.user?.id);

    return data;
  } catch (error) {
    console.error("Error closing journey:", error);
    return null;
  }
}

export async function createJourney(
  payload: Pick<Journey, "seasonId" | "players">
) {
  return journeyController.store(payload);
}

export async function revalidateListJourneys() {
  revalidateTag("list-journeys");
}
