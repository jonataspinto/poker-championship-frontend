import { useCallback, useContext } from "react"
import { INewJourney } from "../../../interfaces";
import { JourneyServices } from "../../../services";
import { JourneyActionsType } from "../interfaces";
import { JourneyContext } from "../journeyContext"

export const useCreateJourney = () => {
  const context = useContext(JourneyContext);

  const { state, dispatch } = context;

  const createJourney = useCallback(async (journeyData: INewJourney) => {
    dispatch({
      type: JourneyActionsType.CREATE_JOURNEY,
    })
    try {
      const data = await JourneyServices.createNewJourney(journeyData);

      dispatch({
        type: JourneyActionsType.CREATE_JOURNEY_SUCCESS,
        payload: {
          journeys: [
            data,
            ...state.journeys
          ]
        }
      })
    } catch (error) {
      console.error(error?.response);

      dispatch({
        type: JourneyActionsType.CREATE_JOURNEY_ERROR
      })
    }
  }, [
    dispatch,
    state.journeys
  ])

  return {
    createJourney
  }
}
