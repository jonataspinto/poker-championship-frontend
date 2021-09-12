
import { IActionReducer, IObjectLiteralCall, Status } from "../../../interfaces";
import { IPlayerState, PlayerActionsType } from "../interfaces";
import { FetchPlayersReducer } from "./fetchPlayers";

export const InitialStatePlayerReducer: IPlayerState = {
  players: [],
  status: Status.DISABLED,
}

export const PlayerReducer = (state: IPlayerState, action: IActionReducer<PlayerActionsType, IPlayerState> ) => {
  if(!action.type) {
    return state;
  }

  const REDUCERS: IObjectLiteralCall<IPlayerState> = {
    ...FetchPlayersReducer(state, action)
  }

  return REDUCERS[action.type]()
}
