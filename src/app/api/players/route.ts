import { NextResponse } from "next/server";
import { FirestoreAdapterDB } from "@/services/database";
import { PlayersRepository } from "@/server/repositories/PlayersRepository";
import { PlayerController } from "@/server/controllers/PlayerController";

export async function GET() {
  const playersRepository = new PlayersRepository(
    new FirestoreAdapterDB("users")
  );

  const playerController = new PlayerController(playersRepository);

  const players = await playerController.index();

  return NextResponse.json(players);
}
