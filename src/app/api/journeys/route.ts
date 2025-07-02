import { type NextRequest, NextResponse } from "next/server";

import { FirestoreAdapterDB } from "@/services/database";
import { JourneysRepository } from "@/server/repositories/JourneysRepository";
import { PlayersRepository } from "@/server/repositories/PlayersRepository";
import { JourneyTagsRepository } from "@/server/repositories/JourneyTagsRepository";
import { SeasonsRepository } from "@/server/repositories/SeasonsRepository";
import { JourneyController } from "@/server/controllers/JourneyController";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const playerId = searchParams.get("playerId") ?? "";

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

  const journeys = await journeyController.index(playerId);

  return NextResponse.json(journeys);
}
