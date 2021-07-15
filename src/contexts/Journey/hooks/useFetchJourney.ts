import { useCallback, useContext } from "react"
import { JourneyServices } from "../../../services";
import { JourneyActionsType } from "../interfaces";
import { JourneyContext } from "../journeyContext"

export const useFetchJourney = () => {
  const context = useContext(JourneyContext);

  const { dispatch } = context;

  const fetchJourneys = useCallback(async () => {
    dispatch({
      type: JourneyActionsType.FETCH_JOURNEY
    })
    try {
      const data = await JourneyServices.getAllJourneys();

      dispatch({
        type: JourneyActionsType.FETCH_JOURNEY_SUCCESS,
        payload: {
          journeys: data
        }
      })
    } catch (error) {
      console.error(error?.response);

      dispatch({
        type: JourneyActionsType.FETCH_JOURNEY_ERROR
      })
    }
  }, [
    dispatch
  ])

  return {
    fetchJourneys
  }
}
