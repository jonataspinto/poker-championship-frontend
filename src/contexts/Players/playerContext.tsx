import React, { createContext, ReactNode, useCallback, useState } from "react";
import { useEffect } from "react";
import { PlayerServices } from "../../services";
import { IPlayer } from "../../interfaces";

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

  const fetchPlayers = useCallback(async () => {
    try {
      const data = await PlayerServices.getAllPlayers();
      setPlayers(data);
    } catch (error) {
      console.error(error?.response)
    }
  }, []);

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
