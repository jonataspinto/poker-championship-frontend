import { NextRequest, NextResponse } from "next/server";

import { FirestoreAdapterDB } from "@/services/database";
import { JourneysRepository } from "@/server/repositories/JourneysRepository";
import { PlayersRepository } from "@/server/repositories/PlayersRepository";
import { JourneyTagsRepository } from "@/server/repositories/JourneyTagsRepository";
import { SeasonsRepository } from "@/server/repositories/SeasonsRepository";
import { JourneyController } from "@/server/controllers/JourneyController";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const journeysRepository = new JourneysRepository(
    new FirestoreAdapterDB("journeys")
  );

  const journeyTagsRepository = new JourneyTagsRepository(
    new FirestoreAdapterDB("journey-tags")
  );

  const playersRepository = new PlayersRepository(
    new FirestoreAdapterDB("users")
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

  const journey = await journeyController.show(id);

  return NextResponse.json(journey);
}
