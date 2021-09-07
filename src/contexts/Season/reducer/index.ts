import { ISeasonState, SeasonActionsType } from "../interfaces";
import { IActionReducer, IObjectLiteralCall, ISeason, Status } from "../../../interfaces"
import { CreateSeasonReducer } from "./createSeason";
import { FetchSeasonReducer } from "./fetchSeasons";
import { UpdateSeasonReducer } from "./updateSeason";

export const initialStateSeasonReducer: ISeasonState = {
  status: Status.DISABLED,
  season: {} as ISeason,
  seasons: []
}

export const SeasonReducer = (state: ISeasonState , action: IActionReducer<SeasonActionsType, ISeasonState>) => {
  if(!action.type){
    return state;
  }

  const REDUCERS: IObjectLiteralCall<ISeasonState> = {
    ...CreateSeasonReducer(state, action),
    ...FetchSeasonReducer(state, action),
    ...UpdateSeasonReducer(state, action)
  }

  return REDUCERS[action.type]();
}
