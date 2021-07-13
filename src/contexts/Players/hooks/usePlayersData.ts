import { useContext } from "react";
import { PlayerContext } from "../playerContext";

export const usePlayersData = () => {
  const context = useContext(PlayerContext);

  if(!context) {
    throw new Error("usePlayersData must be used within an PlayerContextProvider");
  }

  return context;
}
