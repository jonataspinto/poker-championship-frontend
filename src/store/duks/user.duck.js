import * as Service from "../../services/players.service";

const TYPES = {
  SET_USER: "SET_USER",
  SET_USER_SUCCESS: "SET_USER_SUCCESS",
};

const INITIAL_STATE = {
  user: {},
  eroor: {},
};

export const userReducer = (
  state = INITIAL_STATE,
  action,
) => {
  switch (action.type) {
    case TYPES.SET_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

// export const userActions = {
//   fetch: () => async (dispatch) => {
//     try {
//       const data = await Service.fetch();
//       dispatch({ type: TYPES.SET_PLAYERS, payload: data });
//     } catch (error) {
//       dispatch({ type: TYPES.SET_ERROR, payload: error });
//     }
//     dispatch({ type: TYPES.SET_LOADING, payload: false });
//   },
// };
