import { IAuthState, AuthActionsType } from "../interfaces";
import { IActionReducer, IObjectLiteral } from "../../../shared/interfaces"
import { AuthLoadStorageReducer } from "./authLoadStorage";
import { AuthLoginGoogleReducer } from "./authLoginGoogle";
import { AuthSetUserReducer } from "./authSetUser";

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
