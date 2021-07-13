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
    history.push(path, state)
  }, [history])

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
      redirectTo("/login", { from: { pathname: location.pathname }});
      setLoadingAuth(false);
    }
  }, [redirectTo])

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
