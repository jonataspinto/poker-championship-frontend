import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { LoginGoogle, LogOutGoogle, PlayerServices } from "../../services";
import { IPlayer } from "../../shared/interfaces";

interface IAuthContext {
  loginGoogle: () => Promise<void>;
  logoutGoogle: () => Promise<void>;
  handleUpdateProfile: (userData: IPlayer) => Promise<void>;
  isAuthenticated: boolean;
  user: IPlayer;
}

interface IAuthContextProvider {
  children: ReactNode;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({ children }: IAuthContextProvider) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<IPlayer>({} as IPlayer)
  const history = useHistory();

  const loginGoogle = async () => {
    try {
      const response = await LoginGoogle();
      setUser(response);
      setIsAuthenticated(true);
    } catch (error) {
      console.log("Auth", error);
    }
  }

  const logoutGoogle = async () => {
    try {
      await LogOutGoogle();
      setUser({} as IPlayer)
      setIsAuthenticated(false);
    } catch (error) {
      console.log("Auth", error);
    }
  }

  const handleUpdateProfile = async (userData: IPlayer) => {
    try {
      const response: IPlayer = await PlayerServices.updatePlayerProfile(userData);
      setUser(response);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      setUser(JSON.parse(data));
      setIsAuthenticated(true);
    } else {
      const redirectPath = "/login";

      history.push(redirectPath);
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        loginGoogle,
        logoutGoogle,
        handleUpdateProfile,
        isAuthenticated,
        user,
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
