import { IActionReducer, IObjectLiteralCall, Status } from "../../../interfaces";
import { ISeasonState, SeasonActionsType } from "../interfaces";

export const CreateSeasonReducer = (state: ISeasonState, action: IActionReducer<SeasonActionsType, ISeasonState>) => {
  const REDUCERS: IObjectLiteralCall<ISeasonState> = {
    [SeasonActionsType.CREATE_SEASON]: () => ({
      ...state,
      ...action.payload,
      status: Status.LOADING
    }),
    [SeasonActionsType.CREATE_SEASON_SUCCESS]: () => ({
      ...state,
      ...action.payload,
      status: Status.SECCESS
    }),
    [SeasonActionsType.CREATE_SEASON_ERROR]: () => ({
      ...state,
      ...action.payload,
      status: Status.ERROR
    })
  }

  return REDUCERS;
}
