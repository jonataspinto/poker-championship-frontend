import { Dispatch, ReactNode } from "react";
import { PlayerActionsType } from ".";
import { IActionReducer } from "../../../interfaces";
import { IPlayerState } from "./PlayerState";

export interface IPlayerContextProvider {
  children: ReactNode;
}

export interface IPlayerContext {
  state: IPlayerState;
  dispatch: Dispatch<IActionReducer<PlayerActionsType, IPlayerState>>
}
