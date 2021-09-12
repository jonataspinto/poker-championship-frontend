import { useCallback, useContext } from "react"
import { PlayerServices } from "../../../services";
import { PlayerActionsType } from "../interfaces";
import { PlayerContext } from "../playerContext"

export const useFetchPlayers = () => {
  const context = useContext(PlayerContext);

  const { dispatch } = context;

  const fetchPlayers = useCallback(async () => {
    dispatch({
      type: PlayerActionsType.FETCH_PLAYER
    })
    try {
      const data = await PlayerServices.getAllPlayers();

      dispatch({
        type: PlayerActionsType.FETCH_PLAYER_SUCCESS,
        payload: {
          players: data
        }
      })
    } catch (error) {
      console.error(error?.response);

      dispatch({
        type: PlayerActionsType.FETCH_PLAYER_ERROR
      })
    }
  }, [
    dispatch
  ])

  return {
    fetchPlayers
  }
}
