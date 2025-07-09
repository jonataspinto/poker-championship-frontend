"use server";

import { revalidateTag } from "next/cache";
import { HttpClient } from "@/services/clients/httpClient";
import { auth } from "@/auth";
import { JourneysRepository } from "@/server/repositories/JourneysRepository";
import { FirestoreAdapterDB } from "../database";
import { PlayersRepository } from "@/server/repositories/PlayersRepository";
import { JourneyTagsRepository } from "@/server/repositories/JourneyTagsRepository";
import { SeasonsRepository } from "@/server/repositories/SeasonsRepository";
import { JourneyController } from "@/server/controllers/JourneyController";

const client = new HttpClient<Journey, JourneyDTO>(
  process.env.NEXT_PUBLIC_API_BASE_URL || ""
);

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
  const session = await auth();

  return client.put(`/journeys/${id}/close`, {} as Journey, {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`
    }
  });
}

export async function createJourney(
  payload: Pick<Journey, "seasonId" | "players">
) {
  return journeyController.store(payload);
}

export async function revalidateListJourneys() {
  revalidateTag("list-journeys");
}
