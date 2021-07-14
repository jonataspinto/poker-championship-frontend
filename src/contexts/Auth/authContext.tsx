import React, {
  createContext,
  useEffect,
  useCallback,
  useReducer,
  Reducer,
} from "react";
import { useHistory, useLocation } from "react-router-dom";
import { AuthReducer } from "./authReducer";
import { AuthAction, AuthActionsType } from "./authActionsTypes";
import { IAuthContext, IAuthContextProvider, IAuthState } from "./interfaces";
import { IPlayer } from "../../shared/interfaces";
import { useStorage } from "../../utils";

export const initialAuthState = {
  isAuthenticated: false,
  loadingAuth: false,
  user: {} as IPlayer
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({ children }: IAuthContextProvider) => {
  const history = useHistory();
  const location = useLocation();
  const [state, dispatch] = useReducer<Reducer<IAuthState, AuthAction> >(AuthReducer, initialAuthState)

  const { getStorageData } = useStorage();

  const redirectTo = useCallback((path: string, state: any = { from: { pathname: "/" }}) => {
    if(location.pathname !== path) history.push(path, state)
  }, [
    history,
    location.pathname
  ]);

  const mountRedirectState = useCallback(() => {
    return {
      from: {
        pathname: location.pathname
      }
    };
  },[
    location.pathname
  ]);

  useEffect(() => {
    dispatch({
      type: AuthActionsType.LOAD_STORAGE_DATA,
    })

    const { user } = getStorageData<IPlayer>(["user"])

    if (user) {
      dispatch({
        type: AuthActionsType.LOAD_STORAGE_DATA_SUCCESS,
        payload: {
          user
        }
      })
    } else {
      const stateToRedirect = mountRedirectState();
      redirectTo("/login", stateToRedirect );
      dispatch({
        type: AuthActionsType.LOAD_STORAGE_DATA_ERROR,
      })
    }
  }, [
    redirectTo,
    mountRedirectState,
    getStorageData,
    state.isAuthenticated,
  ])

  return (
    <AuthContext.Provider
      value={{
        redirectTo,
        state,
        dispatch,
      }}
    >
      { children }
    </AuthContext.Provider>
  );
}
