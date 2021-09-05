import { IPlayer } from "../../../interfaces";

export type IAuthState = {
  isAuthenticated?: boolean;
  loadingAuth?: boolean;
  user: IPlayer;
}
