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
    <div className="px-4 capitalize">
      <div>
        <span className="font-bold">Melhor mão: </span>
        {bestHand && players.get(bestHand)?.name}
      </div>
      <div>
        <span className="font-bold">Maior eliminador: </span>
        {biggestEliminator && players.get(biggestEliminator)?.name}
      </div>
    </div>
  );
}
