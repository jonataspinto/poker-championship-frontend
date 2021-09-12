import { IActionReducer, IObjectLiteralCall, Status } from "../../../interfaces";
import { IPlayerState, PlayerActionsType } from "../interfaces";

export const FetchPlayersReducer = (state: IPlayerState, action: IActionReducer<PlayerActionsType, IPlayerState>) => {
  const REDUCERS: IObjectLiteralCall<IPlayerState> = {
    [PlayerActionsType.FETCH_PLAYER]: () => ({
      ...state,
      ...action.payload,
      status: Status.LOADING
    }),
    [PlayerActionsType.FETCH_PLAYER_SUCCESS]: () => ({
      ...state,
      ...action.payload,
      status: Status.SECCESS
    }),
    [PlayerActionsType.FETCH_PLAYER_ERROR]: () => ({
      ...state,
      ...action.payload,
      status: Status.ERROR
    })
  }

  return REDUCERS;
}
