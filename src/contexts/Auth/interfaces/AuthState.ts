import { IPlayer } from "../../../shared/interfaces";

export interface IAuthState {
  isAuthenticated?: boolean;
  loadingAuth?: boolean;
  user: IPlayer;
}
