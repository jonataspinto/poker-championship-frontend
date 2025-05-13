import { listPlayers } from "@/services/actions";
import { listSeasons } from "@/services/actions/seasons";
import { NewJourneyDialog } from "./NewJourneyDialog";
import { NewJourneyForm } from "./NewJourneyForm";

export async function CreateNewJourney({ disabled }: { disabled?: boolean }) {
  const players = await listPlayers();
  const seasons = await listSeasons();

  const seasonId = seasons[0]?.id;

  return (
    <NewJourneyDialog disabled={disabled}>
      <NewJourneyForm players={players} seasonId={seasonId} />
    </NewJourneyDialog>
  );
}
