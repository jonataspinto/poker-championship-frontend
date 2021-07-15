import { IActionReducer, IObjectLiteral, Status } from "../../../interfaces";
import { IJourneyState, JourneyActionsType } from "../interfaces";

export const FetchJourneysReducer = (state: IJourneyState, action: IActionReducer<JourneyActionsType, IJourneyState>) => {
  const REDUCERS: IObjectLiteral<IJourneyState> = {
    [JourneyActionsType.FETCH_JOURNEY]: {
      ...state,
      ...action.payload,
      status: Status.LOADING
    },
    [JourneyActionsType.FETCH_JOURNEY_SUCCESS]: {
      ...state,
      ...action.payload,
      status: Status.SECCESS
    },
    [JourneyActionsType.FETCH_JOURNEY_ERROR]: {
      ...state,
      ...action.payload,
      status: Status.ERROR
    }
  }

  return REDUCERS;
}
