import { useContext } from "react";
import { JourneyContext } from "../journeyContext";

export const useJourney = () => {
  const context = useContext(JourneyContext);

  if (!context) {
    throw new Error("useJourney must be used within an JourneyProvider");
  }

  return context;
}
