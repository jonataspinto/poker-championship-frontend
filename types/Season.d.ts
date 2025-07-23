type RoundPodium = Record<
  "first" | "second" | "third" | "fourth" | "fifth",
  PlayerDTO
>;

type Round = {
  tag: number;
  players: PlayerDTO[];
  hasClosed: boolean;
  biggestEliminator?: PlayerDTO;
  bestHand?: PlayerDTO;
  closedBy?: PlayerDTO;
  podium?: RoundPodium;
};

type RoundDTO = Round & {
  id: string;
  createdAt: string;
  updatedAt: string;
};

type Season = {
  tag: number;
  title: string;
  hasClosed: boolean;
  journeys: string[];
  rounds?: RoundDTO[];
  closedBy?: string;
};

type SeasonDTO = Season & {
  id: string;
  createdAt: string;
  updatedAt: string;
};
