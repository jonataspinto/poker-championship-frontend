import { useContext } from "react";
import { AuthActionsType } from "../authActionsTypes";
import { AuthContext } from "../authContext";
import { PlayerServices } from "../../../services";
import { IPlayer } from "../../../shared/interfaces";

export const useProfile = () => {
  const context = useContext(AuthContext);

  if(!context) {
    throw new Error("Ops... não foi possivel conectar-se ao provider.")
  }

  const { state, dispatch } = context

  const handleUpdateProfile = async (userData: IPlayer) => {
    dispatch({
      type: AuthActionsType.SET_USER
    })
    try {
      const user: IPlayer = await PlayerServices.updatePlayerProfile(userData);

      dispatch({
        type: AuthActionsType.SET_USER_SUCCESS,
        payload: {
          user,
        }
      })
    } catch (error) {
      dispatch({
        type: AuthActionsType.SET_USER_ERROR,
        payload: {
          error
        }
      })
    }
  }

  return {
    ...state,
    handleUpdateProfile
  }
}
