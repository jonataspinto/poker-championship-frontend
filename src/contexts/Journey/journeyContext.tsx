import React, { createContext, Reducer } from "react";
import { IActionReducer } from "../../interfaces";
import { IJourneyContext, IJourneyContextProvider, IJourneyState, JourneyActionsType } from "./interfaces";
import { useReducer } from "react";
import { InitialStateJourneyReducer, JourneyReducer } from "./reducer";

export const JourneyContext = createContext<IJourneyContext>({} as IJourneyContext);

export const JourneyProvider = ({ children }: IJourneyContextProvider) => {
  const [state, dispatch] = useReducer<
    Reducer<
      IJourneyState,
      IActionReducer<JourneyActionsType,IJourneyState>
    >
  >(JourneyReducer, InitialStateJourneyReducer)

  return (
    <JourneyContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </JourneyContext.Provider>
  )
}
