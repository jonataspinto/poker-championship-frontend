import { JourneyPoints } from "@/utils";

export async function BestHandAndEliminator({
  journey
}: {
  journey: JourneyDTO;
}) {
  const { listPlayers } = await import("@/services/actions");
  const playersBulk = await listPlayers();
  const players = new Map(playersBulk?.map((player) => [player.id, player]));

  const { bestHand, biggestEliminator } = journey;

  return (
    <div className="capitalize my-2 flex flex-col gap-2">
      <div>
        <span className="font-bold">Melhor mão: </span>
        {bestHand && players.get(bestHand)?.name}{" "}
        <sup className="text-[#9EADBF]">
          <strong> + {JourneyPoints.bestHand}</strong>
        </sup>
      </div>
      <div>
        <span className="font-bold">Maior eliminador: </span>
        {biggestEliminator && players.get(biggestEliminator)?.name}
        <sup className="text-[#9EADBF]">
          <strong> + {JourneyPoints.biggestEliminator}</strong>
        </sup>
      </div>
    </div>
  );
}
