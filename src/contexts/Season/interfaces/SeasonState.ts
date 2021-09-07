
import { ISeason, Status } from "../../../interfaces";

export type ISeasonState = {
  status?: Status;
  season?: ISeason;
  seasons?: Array<ISeason>;
}
