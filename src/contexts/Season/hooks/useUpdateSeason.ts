import { useContext } from "react"
import { SeasonServices } from "services";
import { SeasonActionsType } from "../interfaces";
import { SeasonContext } from "../seasonContext"

export const useUpdateSeason = () => {
  const context  = useContext(SeasonContext);

  if(!context) {
    throw new Error("Ops... não foi possivel conectar-se ao provider.")
  }

  const { state, dispatch } = context;

  const updateSeason = async (seasonData: {}) => {
    dispatch({
      type: SeasonActionsType.UPDATE_SEASON
    })

    try {
      const season = await SeasonServices.updateSeason(seasonData);

      dispatch({
        type: SeasonActionsType.UPDATE_SEASON_SUCCESS,
        payload: {
          season: {
            ...state.season,
            ...season
          }
        }
      })
    } catch (error) {
      dispatch({
        type: SeasonActionsType.UPDATE_SEASON_ERROR,
      })
    }
  }

  return {
    updateSeason
  }
}
