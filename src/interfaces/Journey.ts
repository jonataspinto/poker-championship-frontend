import { IPodium } from "./Podium";

export interface IJourney {
  id?: string,
  uuid: string,
  players: string[],
  bestHand: string,
  biggestEliminator: string,
  hasClosed: boolean,
  closedBy: string,
  podium: IPodium;
  tag: number;
  createdAt: string;
}

export interface INewJourney {
  players: string[],
  createdAt: string,
}
