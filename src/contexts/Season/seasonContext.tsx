import { IActionReducer } from "interfaces";
import React, { createContext, Reducer, useReducer } from "react";
import { ISeasonContext, ISeasonState, SeasonActionsType } from "./interfaces";
import { SeasonReducer, initialStateSeasonReducer } from "./reducer";

export const SeasonContext = createContext<ISeasonContext>({} as ISeasonContext);

export const SeasonProvider = ({ children }: ISeasonContext.Provider) => {
  const [state, dispatch] = useReducer<
    Reducer<
      ISeasonState,
      IActionReducer<SeasonActionsType, ISeasonState>
    >
  >(SeasonReducer, initialStateSeasonReducer)

  return (
    <SeasonContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </SeasonContext.Provider>
  )
}
