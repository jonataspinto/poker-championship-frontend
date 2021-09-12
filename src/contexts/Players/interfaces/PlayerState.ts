import { IPlayer, Status } from "../../../interfaces";

export interface IPlayerState {
  players: Array<IPlayer>;
  status?: Status
}
