import { IActionReducer, IObjectLiteralCall, Status } from "../../../interfaces";
import { ISeasonState, SeasonActionsType } from "../interfaces";

export const UpdateSeasonReducer = (state: ISeasonState, action: IActionReducer<SeasonActionsType, ISeasonState>) => {
  const REDUCERS: IObjectLiteralCall<ISeasonState> = {
    [SeasonActionsType.UPDATE_SEASON]: () => ({
      ...state,
      ...action.payload,
      status: Status.LOADING
    }),
    [SeasonActionsType.UPDATE_SEASON_SUCCESS]: () => ({
      ...state,
      ...action.payload,
      status: Status.SECCESS
    }),
    [SeasonActionsType.UPDATE_SEASON_ERROR]: () => ({
      ...state,
      ...action.payload,
      status: Status.ERROR
    })
  }

  return REDUCERS;
}
