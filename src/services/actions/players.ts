import { HttpClient } from "../clients/httpClient";

const client = new HttpClient<Player, PlayerDTO>(
  process.env.NEXT_PUBLIC_API_BASE_URL || ""
);

export async function listPlayers() {
  return client.get("/players") as unknown as Promise<PlayerDTO[]>;
}

export async function getPlayerById(id: string) {
  return client.get(`/players/${id}`);
}
