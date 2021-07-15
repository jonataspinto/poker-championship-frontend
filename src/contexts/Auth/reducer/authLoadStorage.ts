import { IAuthState, AuthActionsType } from "../interfaces";
import { IActionReducer, IObjectLiteral } from "../../../shared/interfaces"

export const AuthLoadStorageReducer = (state: IAuthState, action: IActionReducer<AuthActionsType, IAuthState>) => {
  const TYPES: IObjectLiteral<IAuthState> = {
    [AuthActionsType.LOAD_STORAGE_DATA]: {
      ...state,
      loadingAuth: true
    },
    [AuthActionsType.LOAD_STORAGE_DATA_SUCCESS]: {
      ...state,
      ...action.payload,
      isAuthenticated: true,
      loadingAuth: false
    },
    [AuthActionsType.LOAD_STORAGE_DATA_ERROR]: {
      ...state,
      isAuthenticated: false,
      loadingAuth: false
    }
  }

  return TYPES;
}
