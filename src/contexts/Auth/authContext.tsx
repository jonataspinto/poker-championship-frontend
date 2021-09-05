import React, {
  createContext,
  useEffect,
  useCallback,
  useReducer,
  Reducer,
} from "react";
import { useHistory, useLocation } from "react-router-dom";
import { AuthReducer, initialStateAuthReducer } from "./reducer";
import { IAuthContext, IAuthState, AuthActionsType } from "./interfaces";
import { IActionReducer, IPlayer } from "../../interfaces";
import { useStorage } from "../../utils";

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({ children }: IAuthContext.IProvider) => {
  const history = useHistory();
  const location = useLocation();
  const [state, dispatch] = useReducer<
    Reducer<
      IAuthState,
      IActionReducer<AuthActionsType, IAuthState>
    >
  >(AuthReducer, initialStateAuthReducer)

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

  const { user } = getStorageData<IPlayer>(["user"]);

  useEffect(() => {
    dispatch({
      type: AuthActionsType.LOAD_STORAGE_DATA,
    })

    if (user) {
      dispatch({
        type: AuthActionsType.LOAD_STORAGE_DATA_SUCCESS,
        payload: {
          user: user as IPlayer
        }
      })
    } else {
      const stateToRedirect = mountRedirectState();
      redirectTo("/login", stateToRedirect );
      dispatch({
        type: AuthActionsType.LOAD_STORAGE_DATA_ERROR,
      })
    }
    // eslint-disable-next-line
  }, [
    redirectTo,
    mountRedirectState,
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
