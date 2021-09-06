import { Dispatch, ReactNode } from "react";
import { ISeasonState } from "./SeasonState";
import { SeasonActionsType } from "./SeasonActionsType";
import { IActionReducer } from "../../../interfaces";

export interface ISeasonContext {
  state: ISeasonState;
  dispatch: Dispatch<IActionReducer<SeasonActionsType, ISeasonState>>
}

export namespace ISeasonContext {
  export type Provider = {
    children: ReactNode;
  }
}
