import React, { createContext, Reducer, useEffect, useReducer } from "react";
import { IActionReducer } from "../../interfaces";
import { ISeasonContext, ISeasonState, SeasonActionsType } from "./interfaces";
import { SeasonReducer, initialStateSeasonReducer } from "./reducer";
import { SeasonServices } from "services";

export const SeasonContext = createContext<ISeasonContext>({} as ISeasonContext);

export const SeasonProvider = ({ children }: ISeasonContext.Provider) => {
  const [state, dispatch] = useReducer<
    Reducer<
      ISeasonState,
      IActionReducer<SeasonActionsType, ISeasonState>
    >
  >(SeasonReducer, initialStateSeasonReducer);

  useEffect(() => {
    (async () => {
      dispatch({
        type: SeasonActionsType.FETCH_SEASON
      })

      try {
        const data = await SeasonServices.getAllSeasons();

        dispatch({
          type: SeasonActionsType.FETCH_SEASON_SUCCESS,
          payload: {
            seasons: data
          }
        })
      } catch (error) {
        dispatch({
          type: SeasonActionsType.FETCH_SEASON_ERROR,
        })
      }
    })()
  }, [])

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
