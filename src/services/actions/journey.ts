"use server";

import { revalidateTag } from "next/cache";
import { HttpClient } from "@/services/clients/httpClient";
import { auth } from "@/auth";

const client = new HttpClient<Journey, JourneyDTO>(
  process.env.NEXT_PUBLIC_API_BASE_URL || ""
);

export async function listJourneys(query?: URLSearchParams) {
  return client.get(`/journeys?${query?.toString()}`, {
    next: {
      tags: ["list-journeys"]
    }
  }) as unknown as Promise<JourneyDTO[]>;
}

export async function getJourneyById(id: string) {
  return client.get(`/journeys/${id}`);
}

export async function updateJourney(id: string, payload: Partial<Journey>) {
  const session = await auth();
  return client.put(`/journeys/${id}`, payload as Journey, {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`
    }
  });
}

export async function closeJourney(id: string) {
  const session = await auth();

  return client.put(`/journeys/${id}/close`, {} as Journey, {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`
    }
  });
}

export async function createJourney(
  payload: Pick<Journey, "seasonId" | "players">
) {
  const session = await auth();

  return client.post("/journeys", payload, {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`
    }
  });
}

export async function revalidateListJourneys() {
  revalidateTag("list-journeys");
}
