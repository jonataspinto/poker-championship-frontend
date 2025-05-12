import "./styles.css";

export async function Podium({
  podium,
  players
}: {
  podium?: Podium;
  players: Map<string, PlayerDTO>;
}) {
  return (
    <div className="podium px-4">
      <div className="first">
        <span className="font-bold"> </span>
        {podium?.first && players.get(podium?.first)?.name}
      </div>

      <div className="second">
        {podium?.second && players.get(podium?.second)?.name}
      </div>

      <div className="third">
        {podium?.third && players.get(podium?.third)?.name}
      </div>

      <div className="first-base py-4 font-bold">1</div>
      <div className="second-base py-4 font-bold">2</div>
      <div className="third-base py-4 font-bold">2</div>
    </div>
  );
}
