import { Dispatch, ReactNode } from "react";
import { IActionReducer, IJourney, INewJourney } from "../../../interfaces";
import { JourneyActionsType } from "./JourneyActionsType";
import { IJourneyState } from "./JourneyState";

export interface IJourneyContextProvider {
  children: ReactNode;
}

export interface IJourneyContext {
  state: IJourneyState;
  dispatch: Dispatch<IActionReducer<JourneyActionsType, IJourneyState>>
}
