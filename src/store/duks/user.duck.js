import { LoginGoogle, LogOutGoogle } from "../../services";

const TYPES = {
  SET_USER: "SET_USER",
  SET_USER_SUCCESS: "SET_USER_SUCCESS",
  LOGOUT_USER: "LOGOUT_USER",

  REFRESH_TOKEN: "REFRESH_TOKEN",
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
    case TYPES.REFRESH_TOKEN:
      return {
        ...state,
        refreshAttempts: 1,
      };
    case TYPES.LOGOUT_USER:
      return { ...INITIAL_STATE };
    default:
      return state;
  }
};

const get = () => async (dispatch) => {
  try {
    const data = await localStorage.getItem("user");
    if (data) {
      dispatch({
        type: TYPES.SET_USER,
        payload: JSON.parse(data),
      });
    }
  } catch (error) {
    console.log("userReducer", error);
  }
};

const authGoogle = () => async (dispatch) => {
  try {
    const validUser = await LoginGoogle();
    dispatch({
      type: TYPES.SET_USER,
      payload: validUser,
    });
  } catch (error) {
    console.log("userReducer", error);
  }
};

const logoutGoogle = () => async (dispatch) => {
  try {
    await LogOutGoogle();
    dispatch({ type: TYPES.LOGOUT_USER });
  } catch (error) {
    console.log("userReducer", error);
  }
};

export const userActions = {
  get,
  authGoogle,
  logoutGoogle,
};
