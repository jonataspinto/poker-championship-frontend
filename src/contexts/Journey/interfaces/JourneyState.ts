import { IJourney, Status } from "../../../interfaces";

export interface IJourneyState {
  journeys: Array<IJourney>;
  status?: Status
}
