import { Dispatch, ReactNode } from "react";
import { IAuthState } from "./AuthState";
import { AuthActionsType } from "./AuthActionsType";
import { IActionReducer } from "../../../interfaces";

export interface IAuthContext {
  redirectTo: (path: string, state: {}) => void;
  state: IAuthState;
  dispatch: Dispatch<IActionReducer<AuthActionsType, IAuthState>>
}

export interface IAuthContextProvider {
  children: ReactNode;
}
