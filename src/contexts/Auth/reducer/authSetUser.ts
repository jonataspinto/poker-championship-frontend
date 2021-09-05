import { IAuthState, AuthActionsType } from "../interfaces";
import { IActionReducer, IObjectLiteral } from "../../../interfaces"
import { initialStateAuthReducer } from ".";

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
      ...initialStateAuthReducer,
    },
  }

  return REDUCERS;
}
