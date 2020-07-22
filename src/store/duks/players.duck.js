import * as Service from "../../services/players.service";

const TYPES = {
  SET_PLAYERS: "SET_PLAYERS",
  SET_LOADING: "PLAYERS_LOADING",
  SET_ERROR: "PLAYERS_ERROR",
};

const INITIAL_STATE = {
  data: {
    players: [],
  },
  loading: false,
  error: null,
};

export const playersReducer = (
  state = INITIAL_STATE,
  action,
) => {
  switch (action.type) {
    case TYPES.SET_PLAYERS:
      return { ...state, data: action.payload };
    case TYPES.SET_LOADING:
      return { ...state, loading: action.payload };
    case TYPES.SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const playersActions = {
  fetch: () => async (dispatch) => {
    dispatch({ type: TYPES.SET_LOADING, payload: true });
    try {
      const data = await Service.fetch();
      dispatch({ type: TYPES.SET_PLAYERS, payload: data });
    } catch (error) {
      dispatch({ type: TYPES.SET_ERROR, payload: error });
    }
    dispatch({ type: TYPES.SET_LOADING, payload: false });
  },
};
