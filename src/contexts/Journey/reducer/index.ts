
import { IActionReducer, IObjectLiteralCall, Status } from "../../../interfaces";
import { IJourneyState, JourneyActionsType } from "../interfaces";
import { CreateJourneyReducer } from "./createJourney";
import { FetchJourneysReducer } from "./fetchJourneys";
import { UpdateAndCloseJourneyReducer } from "./updateJourney";

export const InitialStateJourneyReducer: IJourneyState = {
  journeys: [],
  status: Status.DISABLED,
}

export const JourneyReducer = (state: IJourneyState, action: IActionReducer<JourneyActionsType, IJourneyState> ) => {
  if(!action.type) {
    return state;
  }

  const REDUCERS: IObjectLiteralCall<IJourneyState> = {
    ...CreateJourneyReducer(state, action),
    ...FetchJourneysReducer(state, action),
    ...UpdateAndCloseJourneyReducer(state, action)
  }

  return REDUCERS[action.type]()
}
