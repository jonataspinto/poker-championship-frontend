import { useContext } from "react";
import { AuthContext } from "../authContext";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if(!context) {
    throw new Error("Ops... não foi possivel conectar-se ao provider.")
  }

  return context
}
