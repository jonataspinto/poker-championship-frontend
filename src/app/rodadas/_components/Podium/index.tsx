import "./styles.css";

export async function Podium({
  podium,
  players
}: {
  podium?: Podium;
  players: Map<string, PlayerDTO>;
}) {
  return (
    <div className="podium px-4 overflow-hidden">
      <div className="first font-bold min-w-28">
        <p className="truncate">
          {podium?.first && players.get(podium?.first)?.name}
        </p>
      </div>

      <div className="second truncate mb-1">
        <p className="truncate">
          {podium?.second && players.get(podium?.second)?.name}
        </p>
      </div>

      <div className="third flex mb-1">
        <p className="truncate">
          {podium?.third && players.get(podium?.third)?.name}
        </p>
      </div>

      <div className="first-base py-4 font-bold">1</div>
      <div className="second-base py-4 font-bold">2</div>
      <div className="third-base py-4 font-bold">3</div>
    </div>
  );
}
