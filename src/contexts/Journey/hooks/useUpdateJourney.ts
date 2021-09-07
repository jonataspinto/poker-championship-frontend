import { useCallback, useContext } from "react"
import { IJourney } from "../../../interfaces";
import { JourneyServices } from "../../../services";
import { JourneyActionsType } from "../interfaces";
import { JourneyContext } from "../journeyContext"

export const useUpdateJourney = () => {
  const context = useContext(JourneyContext);

  const { state, dispatch } = context;

  const updateJourney = useCallback(async (journeyData: IJourney) => {
    dispatch({
      type: JourneyActionsType.UPDATE_JOURNEY
    })
    try {
      const data = await JourneyServices.updateJourney(journeyData);

      const draftStateJourneys = state.journeys;

      draftStateJourneys.splice(
        state.journeys.findIndex((journey) => (
          journey.uuid === data.uuid
        )),
        1,
        {
          ...state.journeys.find((journey) => (
            journey.uuid === data.uuid
          )),
          ...data
        },
      );

      dispatch({
        type: JourneyActionsType.UPDATE_JOURNEY_SUCCESS,
        payload: {
          journeys: draftStateJourneys
        }
      })
    } catch (error) {
      console.error(error?.response)
      dispatch({
        type: JourneyActionsType.UPDATE_JOURNEY_ERROR
      })
    }
  }, [
    dispatch,
    state.journeys
  ])

  const closeJourney = useCallback(async (journeyId: string) => {
    dispatch({
      type: JourneyActionsType.CLOSE_JOURNEY
    })
    try {
      const data = await JourneyServices.closeJourney(journeyId);

      const draftStateJourneys = state.journeys;

      draftStateJourneys.splice(
        state.journeys.findIndex((journey) => (
          journey.id === journeyId
        )),
        1,
        data
      );

      dispatch({
        type: JourneyActionsType.CLOSE_JOURNEY_SUCCESS,
        payload: {
          journeys: draftStateJourneys
        }
      })
    } catch (error) {
      console.error(error?.response);

      dispatch({
        type: JourneyActionsType.CLOSE_JOURNEY_ERROR
      })
    }
  }, [
    dispatch,
    state.journeys
  ])

  return {
    updateJourney,
    closeJourney
  }
}
