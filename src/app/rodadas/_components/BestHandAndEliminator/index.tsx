export function BestHandAndEliminator({
  journey,
  players
}: {
  journey: JourneyDTO;
  players: Map<string, PlayerDTO>;
}) {
  const { bestHand, biggestEliminator } = journey;

  return (
    <div className="px-4">
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
