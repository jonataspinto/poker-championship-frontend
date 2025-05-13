import { HttpClient } from "../clients/httpClient";

const client = new HttpClient<Player, PlayerDTO>(
  process.env.NEXT_PUBLIC_API_BASE_URL || ""
);

export async function listSeasons() {
  return client.get("/seasons", {
    next: {
      tags: ["list-seasons"]
    }
  }) as unknown as Promise<PlayerDTO[]>;
}

export async function getSeasonById(id: string) {
  return client.get(`/seasons/${id}`);
}
