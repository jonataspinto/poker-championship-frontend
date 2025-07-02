"use server";

import { revalidateTag } from "next/cache";
import { HttpClient } from "@/services/clients/httpClient";
import { auth } from "@/auth";
import { headers } from "next/headers";

const client = new HttpClient<Journey, JourneyDTO>(
  process.env.NEXT_PUBLIC_API_BASE_URL || ""
);

export async function listJourneys(query?: URLSearchParams) {
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const host = (await headers()).get("host");

  const response = await fetch(
    `${protocol}://${host}/api/journeys?${query?.toString()}`,
    {
      next: {
        tags: ["list-journeys"]
      }
    }
  );

  const data = await response.json();

  return data as unknown as JourneyDTO[];
}

export async function getJourneyById(id: string) {
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const host = (await headers()).get("host");

  const response = await fetch(`${protocol}://${host}/api/journeys/${id}`);

  const data = await response.json();

  return data;
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
