import React, { createContext, Reducer, useReducer } from "react";
import { IPlayerContext, IPlayerContextProvider, IPlayerState, PlayerActionsType } from "./interfaces";
import { PlayerReducer, InitialStatePlayerReducer } from "./reducer";
import { IActionReducer } from "../../interfaces";

export const PlayerContext = createContext<IPlayerContext>({} as IPlayerContext);

export const PlayerProvider = ({ children }: IPlayerContextProvider) => {
  const [state, dispatch] = useReducer<
    Reducer<
      IPlayerState,
      IActionReducer<PlayerActionsType, IPlayerState>
    >
  >(PlayerReducer, InitialStatePlayerReducer )

  return (
    <PlayerContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}
