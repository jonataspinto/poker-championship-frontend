import { IActionReducer, IObjectLiteral, Status } from "../../../interfaces";
import { IJourneyState, JourneyActionsType } from "../interfaces";

export const UpdateAndCloseJourneyReducer = (state: IJourneyState, action: IActionReducer<JourneyActionsType, IJourneyState>) => {
  const REDUCERS: IObjectLiteral<IJourneyState> = {
    [JourneyActionsType.UPDATE_JOURNEY]: {
      ...state,
      status: Status.LOADING
    },
    [JourneyActionsType.UPDATE_JOURNEY_SUCCESS]: {
      ...state,
      ...action.payload,
      status: Status.SECCESS
    },
    [JourneyActionsType.UPDATE_JOURNEY_ERROR]: {
      ...state,
      ...action.payload,
      status: Status.ERROR
    },
    [JourneyActionsType.CLOSE_JOURNEY]: {
      ...state,
      ...action.payload,
      status: Status.LOADING
    },
    [JourneyActionsType.CLOSE_JOURNEY_SUCCESS]: {
      ...state,
      ...action.payload,
      status: Status.SECCESS
    },
    [JourneyActionsType.CLOSE_JOURNEY_ERROR]: {
      ...state,
      ...action.payload,
      status: Status.ERROR
    }
  }

  return REDUCERS;
}
