import { useNotification } from "contexts";
import { useCallback, useContext } from "react"
import { SeasonServices } from "services";
import { SeasonActionsType } from "../interfaces";
import { SeasonContext } from "../seasonContext"

export const useFetchSeason = () => {
  const context  = useContext(SeasonContext);

  if(!context) {
    throw new Error("Ops... não foi possivel conectar-se ao provider.")
  }

  const { state, dispatch } = context;

  const { notify } = useNotification();

  const fetchSeasons = useCallback(async () => {
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
      notify({ type: "success", content: "Temporada atualizada!"})
    } catch (error) {
      dispatch({
        type: SeasonActionsType.FETCH_SEASON_ERROR,
      })
    }
  }, [
    dispatch,
    notify
  ])

  const loadOpenedSeason = useCallback(async () => {
    dispatch({
      type: SeasonActionsType.LOAD_OPENED_SEASON
    })

    try {
      const data = state?.seasons?.find(season => !season.hasClosed);

      dispatch({
        type: SeasonActionsType.LOAD_OPENED_SEASON_SUCCESS,
        payload: {
          season: data
        }
      })
    } catch (error) {
      dispatch({
        type: SeasonActionsType.LOAD_OPENED_SEASON_ERROR,
      })
    }
    // eslint-disable-next-line
  }, [dispatch])

  return {
    fetchSeasons,
    loadOpenedSeason
  }
}
