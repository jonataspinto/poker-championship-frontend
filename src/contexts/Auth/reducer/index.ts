import { IAuthState, AuthActionsType } from "../interfaces";
import { IActionReducer, IObjectLiteral, IPlayer } from "../../../interfaces"
import { AuthLoadStorageReducer } from "./authLoadStorage";
import { AuthLoginGoogleReducer } from "./authLoginGoogle";
import { AuthSetUserReducer } from "./authSetUser";

export const initialStateAuthReducer = {
  isAuthenticated: false,
  loadingAuth: false,
  user: {} as IPlayer
}

export const AuthReducer = (state: IAuthState , action: IActionReducer<AuthActionsType, IAuthState>) => {
  if(!action.type){
    return state;
  }

  const REDUCERS: IObjectLiteral<IAuthState> = {
    ...AuthLoadStorageReducer(state, action),
    ...AuthLoginGoogleReducer(state, action),
    ...AuthSetUserReducer(state, action)
  }

  return REDUCERS[action.type];
}
