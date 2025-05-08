import { PlayersTable } from "@/components/PlayersTable";
import { PlayerService } from "@/services/actions/players";

export default async function Home() {
  const data = await PlayerService.list();

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <PlayersTable.Head />
        <PlayersTable.Body players={data} />
      </table>
    </div>
  );
}
