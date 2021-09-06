import { useContext } from "react";
import { ISeasonContext } from "../interfaces";
import { SeasonContext } from "../seasonContext";
import { useCreateSeason } from "./useCreateSeason";

export const useSeason = () => {
  const context = useContext(SeasonContext);

  if(!context) {
    throw new Error("Ops... não foi possivel conectar-se ao provider.");
  }

  const { state } = context as ISeasonContext;

  return {
    ...state,
    ...useCreateSeason()
  }
}
