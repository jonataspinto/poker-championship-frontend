"use server";

import { PlayersRepository } from "@/server/repositories/PlayersRepository";
import { PlayerController } from "@/server/controllers/PlayerController";
import { FirestoreAdapterDB } from "../database";

export async function listPlayers(): Promise<PlayerDTO[]> {
  const playersRepository = new PlayersRepository(
    new FirestoreAdapterDB("users")
  );

  const playerController = new PlayerController(playersRepository);

  const players = await playerController.index();

  return players;
}

export async function getPlayerById(id: string) {
  const playersRepository = new PlayersRepository(
    new FirestoreAdapterDB("users")
  );

  const playerController = new PlayerController(playersRepository);

  const player = await playerController.show(id);

  return player;
}
