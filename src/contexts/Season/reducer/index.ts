import { ISeasonState, SeasonActionsType } from "../interfaces";
import { IActionReducer, IObjectLiteralCall, Status } from "../../../interfaces"
import { CreateSeasonReducer } from "./createSeason";

export const initialStateSeasonReducer = {
  status: Status.DISABLED,
  season: {}
}

export const SeasonReducer = (state: ISeasonState , action: IActionReducer<SeasonActionsType, ISeasonState>) => {
  if(!action.type){
    return state;
  }

  const REDUCERS: IObjectLiteralCall<ISeasonState> = {
    ...CreateSeasonReducer(state, action)
  }

  return REDUCERS[action.type]();
}
