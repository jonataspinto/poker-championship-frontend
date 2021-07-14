import { Dispatch, ReactNode, SetStateAction } from "react";
import { IPlayer } from "../../../shared/interfaces";
import { AuthAction } from "../authActionsTypes";

export interface IAuthState {
  isAuthenticated: boolean;
  user: IPlayer;
  loadingAuth: boolean;
}

export interface IAuthContext {
  redirectTo: (path: string, state: {}) => void;
  state: IAuthState;
  dispatch: Dispatch<AuthAction>
}

export interface IAuthContextProvider {
  children: ReactNode;
}
