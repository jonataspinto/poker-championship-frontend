import { useContext } from "react"
import { SeasonServices } from "services";
import { SeasonActionsType } from "../interfaces";
import { SeasonContext } from "../seasonContext"

export const useCreateSeason = () => {
  const context  = useContext(SeasonContext);

  if(!context) {
    throw new Error("Ops... não foi possivel conectar-se ao provider.")
  }

  const { dispatch } = context;

  const createSeason = async (seasonData: {}) => {
    dispatch({
      type: SeasonActionsType.CREATE_SEASON
    })

    try {
      const season = await SeasonServices.createNewSeason(seasonData);

      dispatch({
        type: SeasonActionsType.CREATE_SEASON_SUCCESS,
        payload: {
          season
        }
      })
    } catch (error) {
      dispatch({
        type: SeasonActionsType.CREATE_SEASON_ERROR,
      })
    }
  }

  return {
    createSeason
  }
}
