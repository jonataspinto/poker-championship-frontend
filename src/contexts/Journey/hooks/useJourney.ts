import { useContext } from "react";
import { JourneyContext } from "../journeyContext";
import { useFetchJourney } from "./useFetchJourney"
import { useUpdateJourney } from "./useUpdateJourney"
import { useCreateJourney } from "./useCreateJourney"

export const useJourney = () => {
  const context = useContext(JourneyContext);

  if (!context) {
    throw new Error("useJourney must be used within an JourneyProvider");
  }

  const { state } = context

  return {
    ...state,
    ...useFetchJourney(),
    ...useUpdateJourney(),
    ...useCreateJourney()
  };
}
