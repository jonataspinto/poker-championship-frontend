import { IObjectLiteral, IPlayer } from "interfaces"
import { AuthActionsType, IAuthState } from "../interfaces"
import { AuthSetUserReducer } from "./authSetUser"

const initialStateAuthReducer = {
  user: {} as IPlayer,
  isAuthenticated: false,
  loadingAuth: false
}

let state = { } as IObjectLiteral<IAuthState>;

const setState = (newState: any) => state = { ...state, ...newState }

describe("Test auth reducer setUser", () => {
  setState(AuthSetUserReducer(
    initialStateAuthReducer,
    {
      type: AuthActionsType.SET_USER
    }
  ));

  test("should to alter loading auth.", () => {
    expect(state[AuthActionsType.SET_USER]).toMatchObject({
      loadingAuth: true
    });
  });

  setState(AuthSetUserReducer(
    state[AuthActionsType.SET_USER],
    {
      type: AuthActionsType.SET_USER_SUCCESS,
      payload: {
        user: {
          name: "Nero",
          email: "nero@nero",
          isAdmin: false
        } as IPlayer
      }
    }
  ));

  test("should to alter user and loading auth (SUCCESS).", () => {
    expect(state[AuthActionsType.SET_USER_SUCCESS]).toMatchObject({
      loadingAuth: false,
      user: {
        name: "Nero",
        email: "nero@nero",
        isAdmin: false
      }
    });
  });

  setState(AuthSetUserReducer(
    state[AuthActionsType.SET_USER_SUCCESS],
    {
      type: AuthActionsType.SET_USER_ERROR,
    }
  ));

  test("should to alter user and loading auth (ERROR - reset to initialState).", () => {
    expect(state[AuthActionsType.SET_USER_ERROR]).toMatchObject({
      loadingAuth: false,
      user: {}
    })
  })
})
