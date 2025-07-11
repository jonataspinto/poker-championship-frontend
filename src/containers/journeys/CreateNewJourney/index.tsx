import { NewJourneyDialog } from "./NewJourneyDialog";
import { NewJourneyForm } from "./NewJourneyForm";

export async function CreateNewJourney() {
  const { listJourneys, listPlayers, listSeasons } = await import(
    "@/services/actions/"
  );

  const journeys = await listJourneys();
  const players = await listPlayers();
  const seasons = await listSeasons();

  const seasonId = seasons?.[0]?.id;

  return (
    <NewJourneyDialog
      disabled={journeys?.some((journey) => !journey?.hasClosed)}
    >
      <NewJourneyForm players={players} seasonId={seasonId} />
    </NewJourneyDialog>
  );
}
