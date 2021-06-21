import * as Service from "../../services/journey";
import { userActions } from "./user.duck";

const TYPES = {
  GET_JOURNEY_STARTED: "GET_JOURNEY_STARTED",
  GET_JOURNEY_SUCCESS: "GET_JOURNEY_SUCCESS",
  GET_JOURNEY_ERROR: "GET_JOURNEY_ERROR",
};

const INITIAL_STATE = {
  journeys: [],
  loading: false,
};

export const journeyReducer = (
  state = INITIAL_STATE,
  action,
) => {
  switch (action.type) {
    case TYPES.GET_JOURNEY_STARTED:
      return {
        ...state,
        loading: true,
      };
    case TYPES.GET_JOURNEY_SUCCESS:
      return {
        ...state,
        journeys: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const journeyActions = {
  get: () => async (dispatch) => {
    dispatch({
      type: TYPES.GET_JOURNEY_STARTED,
    });
    try {
      const data = await Service.getAllJourneys();
      dispatch({
        type: TYPES.GET_JOURNEY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      if (error?.response?.data?.code === "auth/id-token-expired") {
        dispatch(userActions.logoutGoogle())
      }
      console.log("userReducer", error);
    }
  },
};
