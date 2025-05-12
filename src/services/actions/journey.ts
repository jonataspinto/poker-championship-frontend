import { HttpClient } from "../clients/httpClient";

const client = new HttpClient<Journey, JourneyDTO>(
  process.env.NEXT_PUBLIC_BASE_URL || ""
);

export class JourneyService {
  static async list() {
    return client.get("/journeys", {
      next: {
        tags: ["list-journeys"]
      }
    }) as unknown as Promise<JourneyDTO[]>;
  }

  static async getById(id: string) {
    return client.get(`/journeys/${id}`);
  }

  static async update(id: string, payload: Partial<Journey>) {
    return client.put(`/journeys/${id}`, payload as Journey);
  }

  static async close(id: string) {
    return client.put(`/journeys/${id}/close`, {} as Journey);
  }
}
