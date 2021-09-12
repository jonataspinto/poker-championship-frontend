import { useContext } from "react";
import { PlayerContext } from "../playerContext";
import { useFetchPlayers } from "./useFetchPlayers";

export const usePlayersData = () => {
  const context = useContext(PlayerContext);

  if(!context) {
    throw new Error("usePlayersData must be used within an PlayerContextProvider");
  }

  const { state } = context;

  return {
    ...state,
    ...useFetchPlayers()
  };
}
