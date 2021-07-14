import { useCallback, useContext } from "react";
import { AuthContext, initialAuthState } from "../authContext";
import { AuthActionsType } from "../authActionsTypes";
import { LoginGoogle, LogOutGoogle } from "../../../services";
import { useStorage } from "../../../utils/useStorage";

export const useLoginGoogle = () => {
  const context = useContext(AuthContext);
  const { setStorageData, removeSorageData } = useStorage();

  if(!context) {
    throw new Error("Ops... não foi possivel conectar-se ao provider.")
  }

  const { dispatch } = context

  const loginGoogle = useCallback(async () => {
    dispatch({
      type: AuthActionsType.LOGIN_GOOGLE
    })
    try {
      const { user, accessToken, idToken} = await LoginGoogle();

      setStorageData({
        user,
        accessToken,
        idToken
      });

      dispatch({
        type: AuthActionsType.LOGIN_GOOGLE_SUCCESS,
        payload: {
          user,
        }
      })
    } catch (error) {
      dispatch({
        type: AuthActionsType.LOGIN_GOOGLE_ERROR,
        payload: {
          error
        }
      })
    }
  }, [
    dispatch,
    setStorageData
  ])

  const logoutGoogle = useCallback(async () => {
    dispatch({
      type: AuthActionsType.LOGOUT_GOOGLE
    })
    try {
      await LogOutGoogle();
      dispatch({
        type: AuthActionsType.LOGOUT_GOOGLE_SUCCESS,
        payload: initialAuthState
      })

      removeSorageData([
        "user",
        "accessToken",
        "idToken",
        "persist:root"
      ])
    } catch (error) {
      console.log(error)
      dispatch({
        type: AuthActionsType.LOGOUT_GOOGLE_ERROR,
        payload: {
          error
        }
      })
    }
    // eslint-disable-next-line
  }, [
    // dispatch,
    // removeSorageData
  ])

  return {
    loginGoogle,
    logoutGoogle
  }
}
