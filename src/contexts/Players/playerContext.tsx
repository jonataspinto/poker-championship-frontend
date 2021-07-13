import React, { createContext, ReactNode, useCallback, useState } from "react";
import { useEffect } from "react";
import { PlayerServices, RefreshIdToken } from "../../services";
import { IPlayer } from "../../shared/interfaces";
import { useAuth } from "../Auth";

interface IPlayerContextProvider {
  children: ReactNode
}

interface IPlayerContext {
  players: Array<IPlayer>
  fetchPlayers: () => Promise<void>
}

export const PlayerContext = createContext<IPlayerContext>({} as IPlayerContext);

export const PlayerProvider = ({ children }: IPlayerContextProvider) => {
  const [players, setPlayers] = useState<Array<IPlayer>>([]);
  const { logoutGoogle } = useAuth();

  const fetchPlayers = useCallback(async () => {
    try {
      const data = await PlayerServices.getAllPlayers();
      setPlayers(data);
    } catch (error) {
      if (error?.response?.data?.code === "auth/id-token-expired") {
        await RefreshIdToken(({ status }: { status: string }) => {
          if (status === "success") {
            return fetchPlayers();
          }
          logoutGoogle();
        });
      }
    }
  }, [
    logoutGoogle
  ]);

  useEffect(() => {
    fetchPlayers();
  }, [
    fetchPlayers
  ])

  return (
    <PlayerContext.Provider
      value={{
        players,
        fetchPlayers
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}
