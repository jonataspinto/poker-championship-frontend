import { LoginGoogle, LogOutGoogle } from "../../services";

const TYPES = {
  SET_USER: "SET_USER",
  SET_USER_SUCCESS: "SET_USER_SUCCESS",
  LOGOUT_USER: "LOGOUT_USER",
};

const INITIAL_STATE = {
  user: {},
  isAuthenticated: false,
};

export const userReducer = (
  state = INITIAL_STATE,
  action,
) => {
  switch (action.type) {
    case TYPES.SET_USER:
      return { ...state, user: action.payload, isAuthenticated: true };
    case TYPES.LOGOUT_USER:
      return { ...INITIAL_STATE };
    default:
      return state;
  }
};

export const userActions = {
  get: () => async (dispatch) => {
    try {
      const data = await localStorage.getItem("user");
      if (data) dispatch({ type: TYPES.SET_USER, payload: JSON.parse(data) });
    } catch (error) {
      console.log("userReducer", error);
    }
  },
  authGoogle: () => async (dispatch) => {
    try {
      const validUser = await LoginGoogle();
      dispatch({ type: TYPES.SET_USER, payload: validUser });
    } catch (error) {
      console.log("userReducer", error);
    }
  },
  logoutGoogle: () => async (dispatch) => {
    try {
      LogOutGoogle();
      dispatch({ type: TYPES.LOGOUT_USER });
    } catch (error) {
      console.log("userReducer", error);
    }
  },
};
