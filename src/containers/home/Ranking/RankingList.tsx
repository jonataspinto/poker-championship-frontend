import { Avatar } from "@/components";
import { listPlayers } from "@/services/actions";
import { RankingListSkeleton } from "./RankingListSkeleton";

export async function RankingList() {
  let players = null;

  try {
    players = await listPlayers();
  } catch (error) {
    console.error("Failed to fetch players:", error);
  }

  if (!players || players.length === 0) {
    return <RankingListSkeleton />;
  }

  return players.map((player) => (
    <div key={player?.id} className="flex gap-4 items-center">
      <Avatar
        width={56}
        height={56}
        alt={player?.name || ""}
        src={player?.photoURL || ""}
        className="rounded-full bg-gray-700 animate-fadeId"
      />
      <div className="animate-fadeId">
        <p className="text-base font-semibold text-white capitalize font-sans">
          {player?.name}
        </p>
        <p className="text-sm font-light text-[#9EADBF]">
          {player?.points} Pontos
        </p>
      </div>
    </div>
  ));
}
