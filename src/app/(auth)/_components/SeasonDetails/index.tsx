import { listSeasons } from "@/services/actions";

export async function SeasonDetails() {
  const seasons = await listSeasons();

  const currentSeason = seasons[0];
  return (
    <div>
      SeasonDetails
      {JSON.stringify(currentSeason, null, 2)}
    </div>
  );
}
