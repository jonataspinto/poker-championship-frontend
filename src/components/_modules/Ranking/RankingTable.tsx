import { PlayersTable } from "@/components/PlayersTable";
import { listPlayers } from "@/services/actions";

export async function RankingTable() {
  const players = await listPlayers();

  return (
    <section className="relative overflow-x-auto">
      <div className="relative overflow-x-auto rounded">
        <PlayersTable.Root>
          <PlayersTable.Head />
          <PlayersTable.Body players={players} />
        </PlayersTable.Root>
      </div>
    </section>
  );
}
