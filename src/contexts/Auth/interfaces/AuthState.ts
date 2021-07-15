import { IPlayer } from "../../../interfaces";

export interface IAuthState {
  isAuthenticated?: boolean;
  loadingAuth?: boolean;
  user: IPlayer;
}
