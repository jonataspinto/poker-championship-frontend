import { HttpClient } from "../clients/httpClient";

const client = new HttpClient<Player, PlayerDTO>(
  process.env.NEXT_PUBLIC_API_BASE_URL || ""
);

export class PlayerService {
  static async list() {
    return client.get("/players") as unknown as Promise<PlayerDTO[]>;
  }

  static async getById(id: string) {
    return client.get(`/players/${id}`);
  }
}
