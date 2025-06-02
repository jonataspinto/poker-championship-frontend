import { PlayersTable } from "@/components/PlayersTable";
import { listPlayers } from "@/services/actions";

export async function Ranking() {
  const players = await listPlayers();

  return (
    <div className="relative overflow-x-auto rounded">
      <PlayersTable.Root>
        <PlayersTable.Head />
        <PlayersTable.Body players={players} />
      </PlayersTable.Root>
    </div>
  );
}
