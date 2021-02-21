import * as Service from "../../services/journey.service";

const TYPES = {
  GET_JOURNEY_STARTED: "GET_JOURNEY_STARTED",
  GET_JOURNEY_SUCCESS: "GET_JOURNEY_SUCCESS",
  GET_JOURNEY_ERROR: "GET_JOURNEY_ERROR",
};

const INITIAL_STATE = {
  journeys: null,
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
      const data = await Service.fetch();
      dispatch({
        type: TYPES.GET_JOURNEY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log("userReducer", error);
    }
  },
};
