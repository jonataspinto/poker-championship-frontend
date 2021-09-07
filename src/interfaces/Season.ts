export interface ISeason {
  id?: string;
  uuid: string;
  tag: number;
  journeys: string[];
  hasClosed: boolean;
  closedBy: string;
  createdAt: string;
}
