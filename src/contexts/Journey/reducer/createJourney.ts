import { IActionReducer, IObjectLiteral, Status } from "../../../interfaces";
import { IJourneyState, JourneyActionsType } from "../interfaces";

export const CreateJourneyReducer = (state: IJourneyState, action: IActionReducer<JourneyActionsType, IJourneyState>) => {
  const REDUCERS: IObjectLiteral<IJourneyState> = {
    [JourneyActionsType.CREATE_JOURNEY]: {
      ...state,
      ...action.payload,
      status: Status.LOADING
    },
    [JourneyActionsType.CREATE_JOURNEY_SUCCESS]: {
      ...state,
      ...action.payload,
      status: Status.SECCESS
    },
    [JourneyActionsType.CREATE_JOURNEY_ERROR]: {
      ...state,
      ...action.payload,
      status: Status.ERROR
    }
  }

  return REDUCERS;
}
