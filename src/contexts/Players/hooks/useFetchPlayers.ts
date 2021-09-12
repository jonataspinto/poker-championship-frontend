import { useCallback, useContext } from "react";
import { useNotification } from "../../Notification";
import { PlayerServices } from "../../../services";
import { PlayerActionsType } from "../interfaces";
import { PlayerContext } from "../playerContext"

export const useFetchPlayers = () => {
  const context = useContext(PlayerContext);

  const { dispatch } = context;

  const { notify } = useNotification();

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
      notify({ type: "success", content: "Tabela carregada com socesso!"})
    } catch (error) {
      console.error(error?.response);

      dispatch({
        type: PlayerActionsType.FETCH_PLAYER_ERROR
      })
    }
  }, [
    dispatch,
    notify
  ])

  return {
    fetchPlayers
  }
}
