import { NewRoundDialog } from "./NewRoundDialog";
import { NewRoundForm } from "./NewRoundForm";

export async function CreateNewRound() {
  const { listPlayers, listSeasons } = await import("@/services/actions/");

  const players = await listPlayers();
  const seasons = await listSeasons();

  const seasonId = seasons?.[0]?.id;

  return (
    <NewRoundDialog>
      <NewRoundForm players={players} seasonId={seasonId} />
    </NewRoundDialog>
  );
}
