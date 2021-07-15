import { IAuthState, AuthActionsType } from "../interfaces";
import { IActionReducer, IObjectLiteral } from "../../../shared/interfaces"

export const AuthLoginGoogleReducer = (state: IAuthState, action: IActionReducer<AuthActionsType, IAuthState>) => {
  const REDUCERS: IObjectLiteral<IAuthState> = {
    [AuthActionsType.LOGIN_GOOGLE]: {
      ...state,
      loadingAuth: true,
    },
    [AuthActionsType.LOGIN_GOOGLE_SUCCESS]: {
      ...state,
      ...action.payload,
      isAuthenticated: true,
      loadingAuth: false
    },
    [AuthActionsType.LOGIN_GOOGLE_ERROR]: {
      ...state,
      isAuthenticated: false,
      loadingAuth: false
    },
    [AuthActionsType.LOGOUT_GOOGLE]: {
      ...state,
      loadingAuth: true
    },
    [AuthActionsType.LOGOUT_GOOGLE_SUCCESS]: {
      ...state,
      ...action.payload
    },
    [AuthActionsType.LOGOUT_GOOGLE_ERROR]: {
      ...state,
      isAuthenticated: false,
      loadingAuth: false,
    }
  }

  return REDUCERS;
}
