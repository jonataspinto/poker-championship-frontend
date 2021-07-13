import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useCallback } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { LoginGoogle, LogOutGoogle, PlayerServices } from "../../services";
import { IPlayer } from "../../shared/interfaces";

interface IAuthContext {
  loginGoogle: () => Promise<void>;
  logoutGoogle: () => Promise<void>;
  handleUpdateProfile: (userData: IPlayer) => Promise<void>;
  isAuthenticated: boolean;
  user: IPlayer;
  loadingAuth: boolean;
  redirectTo: (path: string, state: {}) => void
}

interface IAuthContextProvider {
  children: ReactNode;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({ children }: IAuthContextProvider) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loadingAuth, setLoadingAuth] = useState<boolean>(false);
  const [user, setUser] = useState<IPlayer>({} as IPlayer)
  const history = useHistory();
  const location = useLocation();

  const redirectTo = useCallback((path: string, state: any = { from: { pathname: "/" }}) => {
    if(location.pathname !== path) history.push(path, state)
  }, [
    history,
    location.pathname
  ]);

  const mountState = useCallback(() => {
    const state = {
      from: {
        pathname: location.pathname
      }
    };

    return state;
  },[
    location.pathname
  ]);

  const loginGoogle = useCallback(async () => {
    setLoadingAuth(true);
    try {
      const response = await LoginGoogle();
      setUser(response);
      setIsAuthenticated(true);
      setLoadingAuth(false);
    } catch (error) {
      console.log("Auth", error);
      setLoadingAuth(false);
    }
  }, [])

  const logoutGoogle = useCallback(async () => {
    setLoadingAuth(true);
    try {
      await LogOutGoogle();
      setUser({} as IPlayer)
      setIsAuthenticated(false);
      setLoadingAuth(false);
    } catch (error) {
      console.log("Auth", error);
      setLoadingAuth(false);
    }
  }, [])

  const handleUpdateProfile = async (userData: IPlayer) => {
    setLoadingAuth(true);
    try {
      const response: IPlayer = await PlayerServices.updatePlayerProfile(userData);
      setUser(response);
      setLoadingAuth(false);
    } catch (error) {
      console.log(error)
      setLoadingAuth(false);
    }
  }

  useEffect(() => {
    setLoadingAuth(true);
    const data = localStorage.getItem("user");
    if (data) {
      setUser(JSON.parse(data));
      setIsAuthenticated(true);
      setLoadingAuth(false);
    } else {
      const state = mountState();
      redirectTo("/login", state );
      setLoadingAuth(false);
    }
  }, [
    redirectTo,
    mountState
  ])

  return (
    <AuthContext.Provider
      value={{
        loginGoogle,
        logoutGoogle,
        handleUpdateProfile,
        isAuthenticated,
        user,
        loadingAuth,
        redirectTo
      }}
    >
      { children }
    </AuthContext.Provider>
  );
}

export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);

  if(!context) {
    throw new Error("Ops... não foi possivel conectar-se ao provider.")
  }

  return context
}
