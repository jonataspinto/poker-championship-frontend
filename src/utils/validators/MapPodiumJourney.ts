import { IJourney, IPlayer } from "@/interfaces";

export const MapPodiumJourney = (journey: IJourney, players: Array<IPlayer>) => {
  const closedBy = players.find((player) => (
    player.uuid === journey.closedBy
  ));

  const podiums = Object.entries({
    primeiro: players.find((player) => (
      player.uuid === journey.podium.first
    )),
    segundo: players.find((player) => (
      player.uuid === journey.podium.second
    )),
    terceiro: players.find((player) => (
      player.uuid === journey.podium.third
    )),
    quarto: players.find((player) => (
      player.uuid === journey.podium.fourth
    )),
    quinto: players.find((player) => (
      player.uuid === journey.podium.fifth
    )),
  }).map((position) => ({
    label: position[0],
    player: { ...position[1] } as IPlayer,
  }));

  const otherScorers = Object.entries({
    "melhor mão": players.find((player) => (
      player.uuid === journey.bestHand
    )),
    "maior eliminador": players.find((player) => (
      player.uuid === journey.biggestEliminator
    )),
  }).map((position) => ({
    label: position[0],
    player: { ...position[1]} as IPlayer,
  }));

  return {
    closedBy,
    podiums,
    otherScorers
  }
}
