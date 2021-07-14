import { useContext } from "react";
import { useLoginGoogle } from "./useLoginGoogle";
import { useProfile } from "./useProfile";
import { AuthContext } from "../authContext";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if(!context) {
    throw new Error("Ops... não foi possivel conectar-se ao provider.");
  }

  const { redirectTo } = context;

  return {
    ...useLoginGoogle(),
    ...useProfile(),
    redirectTo,
  }
}
