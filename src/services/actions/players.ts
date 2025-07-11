"use server";

import { PlayersRepository } from "@/server/repositories/PlayersRepository";
import { PlayerController } from "@/server/controllers/PlayerController";
import { FirestoreAdapterDB } from "../database";

const playersRepository = new PlayersRepository(
  new FirestoreAdapterDB("users")
);

const playerController = new PlayerController(playersRepository);

export async function listPlayers(): Promise<PlayerDTO[]> {
  try {
    const players = await playerController.index();
    return players;
  } catch (error) {
    console.error("listPlayers ~ error:", error);
    return [];
  }
}

export async function getPlayerById(id: string) {
  try {
    const player = await playerController.show(id);

    if (!player) {
      throw new Error(`Player with id ${id} not found`);
    }

    return player;
  } catch (error) {
    console.error("getPlayerById ~ error:", error);
    return null;
  }
}
