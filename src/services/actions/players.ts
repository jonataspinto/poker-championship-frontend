"use server";

import { headers } from "next/headers";

export async function listPlayers() {
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const host = (await headers()).get("host");

  const response = await fetch(`${protocol}://${host}/api/players`, {
    next: {
      tags: ["list-players"]
    }
  });

  const data = await response.json();

  return data as PlayerDTO[];
}

export async function getPlayerById(id: string) {
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const host = (await headers()).get("host");

  const response = await fetch(`${protocol}://${host}/api/players/${id}`, {});

  const data = await response.json();

  return data as PlayerDTO;
}
