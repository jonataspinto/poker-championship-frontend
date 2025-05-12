type Journey = {
  tag: number;
  players: string[];
  seasonId: string;
  hasClosed: boolean;
  biggestEliminator?: string;
  bestHand?: string;
  closedBy?: string;
  podium?: Podium;
};

type JourneyDTO = Journey & {
  id: string;
  createdAt: string;
  updatedAt: string;
};

type JourneyTag = {
  tagNumber?: number;
  seasonId: string;
};

type JourneyTagDTO = {
  id: string;
  tagNumber: number;
  seasonId: string;
};
