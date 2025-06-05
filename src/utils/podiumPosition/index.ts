export function podiumPosition(podium?: Podium, _playerId?: string) {
  if (!podium || !_playerId) return "--";

  const podiumBulk = Object.values(podium);

  const position = podiumBulk.findIndex((player) => player === _playerId);

  if (position >= 0) {
    return `${position + 1}º lugar`;
  }

  return "--";
}
