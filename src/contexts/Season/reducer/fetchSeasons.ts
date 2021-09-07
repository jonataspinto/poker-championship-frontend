import { IActionReducer, IObjectLiteralCall, Status } from "../../../interfaces";
import { ISeasonState, SeasonActionsType } from "../interfaces";

export const FetchSeasonReducer = (state: ISeasonState, action: IActionReducer<SeasonActionsType, ISeasonState>) => {
  const REDUCERS: IObjectLiteralCall<ISeasonState> = {
    [SeasonActionsType.FETCH_SEASON]: () => ({
      ...state,
      ...action.payload,
      status: Status.LOADING
    }),
    [SeasonActionsType.FETCH_SEASON_SUCCESS]: () => ({
      ...state,
      ...action.payload,
      status: Status.SECCESS
    }),
    [SeasonActionsType.FETCH_SEASON_ERROR]: () => ({
      ...state,
      ...action.payload,
      status: Status.ERROR
    }),
    [SeasonActionsType.LOAD_OPENED_SEASON]: () => ({
      ...state,
      ...action.payload,
      status: Status.LOADING
    }),
    [SeasonActionsType.LOAD_OPENED_SEASON_SUCCESS]: () => ({
      ...state,
      ...action.payload,
      status: Status.SECCESS
    }),
    [SeasonActionsType.LOAD_OPENED_SEASON_ERROR]: () => ({
      ...state,
      ...action.payload,
      status: Status.ERROR
    })
  }

  return REDUCERS;
}
