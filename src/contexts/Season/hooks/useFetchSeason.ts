import { useNotification } from "contexts";
import { useCallback, useContext } from "react";
import { SeasonServices } from "services";
import { SeasonActionsType } from "../interfaces";
import { SeasonContext } from "../seasonContext";

export const useFetchSeason = () => {
  const context = useContext(SeasonContext);

  if (!context) {
    throw new Error("Ops... não foi possivel conectar-se ao provider.");
  }

  const { dispatch } = context;

  const { notify } = useNotification();

  const fetchSeasons = useCallback(async () => {
    dispatch({
      type: SeasonActionsType.FETCH_SEASON
    });

    try {
      const data = await SeasonServices.getAllSeasons();

      dispatch({
        type: SeasonActionsType.FETCH_SEASON_SUCCESS,
        payload: {
          seasons: data
        }
      });
      notify({ type: "success", content: "Temporada atualizada!" });

      const openedSeason = data.find((season) => !season.hasClosed);

      if (openedSeason) {
        dispatch({
          type: SeasonActionsType.LOAD_OPENED_SEASON_SUCCESS,
          payload: {
            season: openedSeason
          }
        });
      } else {
        dispatch({
          type: SeasonActionsType.LOAD_OPENED_SEASON_ERROR
        });
      }
    } catch (error) {
      dispatch({
        type: SeasonActionsType.FETCH_SEASON_ERROR
      });
    }
  }, [dispatch, notify]);

  return {
    fetchSeasons
  };
};
