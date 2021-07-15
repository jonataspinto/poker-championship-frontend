import { IAuthState, AuthActionsType } from "../interfaces";
import { IActionReducer, IObjectLiteral } from "../../../shared/interfaces"

export const AuthSetUserReducer = (state: IAuthState, action: IActionReducer<AuthActionsType, IAuthState>) => {
  const REDUCERS: IObjectLiteral<IAuthState> = {
    [AuthActionsType.SET_USER]: {
      ...state,
      loadingAuth: true,
    },
    [AuthActionsType.SET_USER_SUCCESS]: {
      ...state,
      ...action.payload,
      loadingAuth: false,
    },
    [AuthActionsType.SET_USER_ERROR]: {
      ...state,
      loadingAuth: false,
    },
  }

  return REDUCERS;
}
