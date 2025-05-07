import { IJourney, IPlayer } from "interfaces";

export const MapPodiumJourney = (
  journey: IJourney,
  players: Array<IPlayer>
) => {
  const closedBy = players.find((player) => player.id === journey.closedBy);

  const podiums = Object.entries({
    primeiro: players.find((player) => player.id === journey?.podium?.first),
    segundo: players.find((player) => player.id === journey?.podium?.second),
    terceiro: players.find((player) => player.id === journey?.podium?.third),
    quarto: players.find((player) => player.id === journey?.podium?.fourth),
    quinto: players.find((player) => player.id === journey?.podium?.fifth)
  }).map((position) => ({
    label: position[0],
    player: { ...position[1] } as IPlayer
  }));

  const otherScorers = Object.entries({
    "melhor mão": players.find((player) => player.id === journey.bestHand),
    "maior eliminador": players.find(
      (player) => player.id === journey.biggestEliminator
    )
  }).map((position) => ({
    label: position[0],
    player: { ...position[1] } as IPlayer
  }));

  return {
    closedBy,
    podiums,
    otherScorers
  };
};
