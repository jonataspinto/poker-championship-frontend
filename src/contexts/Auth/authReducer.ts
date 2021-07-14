import { AuthAction, AuthActionsType } from "./authActionsTypes";
import { IAuthState } from "./interfaces";

export const AuthReducer = (state: IAuthState , action: AuthAction) => {
  switch (action.type){
    case AuthActionsType.LOAD_STORAGE_DATA: {
      return {
        ...state,
        loadingAuth: true
      }
    }
    case AuthActionsType.LOAD_STORAGE_DATA_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loadingAuth: false
      }
    }
    case AuthActionsType.LOAD_STORAGE_DATA_ERROR: {
      return {
        ...state,
        isAuthenticated: false,
        loadingAuth: false
      }
    }

    case AuthActionsType.LOGIN_GOOGLE: {
      return {
        ...state,
        loadingAuth: true,
      }
    }
    case AuthActionsType.LOGIN_GOOGLE_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loadingAuth: false
      }
    }
    case AuthActionsType.LOGIN_GOOGLE_ERROR: {
      return {
        ...state,
        isAuthenticated: false,
        loadingAuth: false
      }
    }

    case AuthActionsType.LOGOUT_GOOGLE: {
      return {
        ...state,
        loadingAuth: true
      }
    }
    case AuthActionsType.LOGOUT_GOOGLE_SUCCESS: {
      return {
        ...state,
        ...action.payload
      }
    }
    case AuthActionsType.LOGOUT_GOOGLE_ERROR: {
      return {
        ...state,
        isAuthenticated: false,
        loadingAuth: false,
      }
    }

    case AuthActionsType.SET_USER: {
      return {
        ...state,
        loadingAuth: true,
      }
    }
    case AuthActionsType.SET_USER_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        loadingAuth: false,
      }
    }
    case AuthActionsType.SET_USER_ERROR: {
      return {
        ...state,
        loadingAuth: false,
      }
    }
    default: {
      return state
    }
  }
}
