import { PlayersTable } from "@/components/PlayersTable";
import { PlayerService } from "@/services/actions/players";

export default async function Home() {
  const data = await PlayerService.list();

  return (
    <div className="relative overflow-x-auto">
      <PlayersTable.Root>
        <PlayersTable.Head />
        <PlayersTable.Body players={data} />
      </PlayersTable.Root>
    </div>
  );
}
