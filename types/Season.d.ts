type Season = {
  tag: number;
  title: string;
  hasClosed: boolean;
  journeys: string[];
  closedBy?: string;
};

type SeasonDTO = Season & {
  id: string;
  createdAt: string;
  updatedAt: string;
};
