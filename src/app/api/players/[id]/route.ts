import { NextRequest, NextResponse } from "next/server";
import { FirestoreAdapterDB } from "@/services/database";
import { PlayersRepository } from "@/server/repositories/PlayersRepository";
import { PlayerController } from "@/server/controllers/PlayerController";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const playersRepository = new PlayersRepository(
    new FirestoreAdapterDB("users")
  );
  const { id } = await params;

  const playerController = new PlayerController(playersRepository);

  const player = await playerController.show(id);

  if (!player) {
    return NextResponse.json({ error: "Player not found" }, { status: 404 });
  }

  return NextResponse.json(player);
}
