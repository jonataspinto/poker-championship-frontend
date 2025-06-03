import { Avatar } from "@/components";
import { listPlayers } from "@/services/actions";

export async function Ranking() {
  const players = await listPlayers();
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate loading delay

  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Ranking</h1>
      {players.map((player) => (
        <div key={player?.id} className="flex gap-4 items-center">
          <Avatar
            width={56}
            height={56}
            alt={player?.name || ""}
            src={player?.photoURL || ""}
            className="rounded-full bg-gray-700"
          />
          <div>
            <p className="text-base font-semibold text-white capitalize font-sans">
              {player?.name}
            </p>
            <p className="text-sm font-light text-[#9EADBF]">
              {player?.points} Pontos
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}

export async function RankingSkeleton() {
  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Ranking</h1>

      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="flex gap-4 items-center animate-pulse">
          <div className="w-14 h-14 bg-gray-700 rounded-full" />
          <div className="flex flex-col gap-1">
            <div className="w-32 h-6 bg-gray-700 rounded" />
            <div className="w-20 h-4 bg-gray-600 rounded" />
          </div>
        </div>
      ))}
    </section>
  );
}
