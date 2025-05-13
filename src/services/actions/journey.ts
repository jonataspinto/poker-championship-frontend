"use server";

import { revalidateTag } from "next/cache";
import { HttpClient } from "../clients/httpClient";

const client = new HttpClient<Journey, JourneyDTO>(
  process.env.NEXT_PUBLIC_BASE_URL || ""
);

export async function listJourneys() {
  return client.get("/journeys", {
    next: {
      tags: ["list-journeys"]
    }
  }) as unknown as Promise<JourneyDTO[]>;
}

export async function getJourneyById(id: string) {
  return client.get(`/journeys/${id}`);
}

export async function updateJourney(id: string, payload: Partial<Journey>) {
  return client.put(`/journeys/${id}`, payload as Journey);
}

export async function closeJourney(id: string) {
  return client.put(`/journeys/${id}/close`, {} as Journey);
}

export async function revalidateListJourneys() {
  revalidateTag("list-journeys");
}
