import { twMerge } from "tailwind-merge";
import { ComponentProps, Suspense } from "react";
import { Avatar } from "@/components";
import { listPlayers } from "@/services/actions";

async function RankingList() {
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

function RankingListSkeleton() {
  return Array.from({ length: 7 }).map((_, index) => (
    <div key={index} className="flex gap-4 items-center animate-pulse">
      <div className="w-14 h-14 bg-gray-700 rounded-full" />
      <div className="flex flex-col gap-1">
        <div className="w-32 h-6 bg-gray-700 rounded" />
        <div className="w-20 h-4 bg-gray-600 rounded" />
      </div>
    </div>
  ));
}

export function Ranking({ className, ...rest }: ComponentProps<"section">) {
  return (
    <section className={twMerge("flex flex-col gap-4", className)} {...rest}>
      <h1 className="text-2xl font-bold">Ranking</h1>
      <Suspense fallback={<RankingListSkeleton />}>
        <RankingList />
      </Suspense>
    </section>
  );
}
