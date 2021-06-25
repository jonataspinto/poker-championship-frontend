import * as Service from "../../services/journey";
import { userActions } from "./user.duck";

const TYPES = {
  GET_JOURNEY_STARTED: "GET_JOURNEY_STARTED",
  GET_JOURNEY_SUCCESS: "GET_JOURNEY_SUCCESS",
  GET_JOURNEY_ERROR: "GET_JOURNEY_ERROR",

  CREATE_JOURNEY_STARTED: "CREATE_JOURNEY_STARTED",
  CREATE_JOURNEY_SUCCESS: "CREATE_JOURNEY_SUCCESS",
  CREATE_JOURNEY_ERROR: "CREATE_JOURNEY_ERROR",

  UPDATE_JOURNEY_STARTED: "UPDATE_JOURNEY_STARTED",
  UPDATE_JOURNEY_SUCCESS: "UPDATE_JOURNEY_SUCCESS",
  UPDATE_JOURNEY_ERROR: "UPDATE_JOURNEY_ERROR",

  CLOSE_JOURNEY_STARTED: "CLOSE_JOURNEY_STARTED",
  CLOSE_JOURNEY_SUCCESS: "CLOSE_JOURNEY_SUCCESS",
  CLOSE_JOURNEY_ERROR: "CLOSE_JOURNEY_ERROR",
};

const INITIAL_STATE = {
  journeys: [],
  loading: false,
  notify: {
    message: "",
    type: "",
  },
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
        ...action.payload,
        loading: false,
      };
    case TYPES.GET_JOURNEY_ERROR:
      return {
        ...state,
        ...action.payload,
        loading: false,
      };

    //
    case TYPES.CREATE_JOURNEY_STARTED:
      return {
        ...state,
        loading: true,
      };
    case TYPES.CREATE_JOURNEY_SUCCESS:
      return {
        ...state,
        journeys: [
          action.payload.journey,
          ...state.journeys,
        ],
        notify: action.payload.notify,
        loading: false,
      };
    case TYPES.CREATE_JOURNEY_ERROR:
      return {
        ...state,
        ...action.payload,
        loading: false,
      };

    //
    case TYPES.UPDATE_JOURNEY_STARTED:
      return {
        ...state,
        loading: true,
      };
    case TYPES.UPDATE_JOURNEY_SUCCESS:
      return {
        ...state,
        journeys: state.journeys.splice(
          state.journeys.findIndex((journey) => (
            journey.uuid === action.payload.journey.uuid
          )),
          1,
          action.payload.journey,
        ),
        notify: action.payload.notify,
        loading: false,
      };
    case TYPES.UPDATE_JOURNEY_ERROR:
      return {
        ...state,
        ...action.payload,
        loading: false,
      };

    //
    case TYPES.CLOSE_JOURNEY_STARTED:
      return {
        ...state,
        loading: true,
      };
    case TYPES.CLOSE_JOURNEY_SUCCESS:
      return {
        ...state,
        journeys: action.payload,
        loading: false,
      };
    case TYPES.CLOSE_JOURNEY_ERROR:
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

const get = () => async (dispatch) => {
  dispatch({
    type: TYPES.GET_JOURNEY_STARTED,
  });
  try {
    const data = await Service.getAllJourneys();
    dispatch({
      type: TYPES.GET_JOURNEY_SUCCESS,
      payload: {
        journeys: data,
        notify: {
          message: "Lista carregada com sucesso",
          type: "success",
        },
      },
    });
  } catch (error) {
    if (error?.response?.data?.code === "auth/id-token-expired") {
      dispatch(userActions.logoutGoogle());
      dispatch({
        type: TYPES.GET_JOURNEY_SUCCESS,
        payload: {
          notify: {
            message: "Por Favor, faça login novamente.",
            type: "error",
          },
        },
      });
    }
    console.log("userReducer", error);
  }
};

const create = (journeyData) => async (dispatch) => {
  dispatch({
    type: TYPES.CREATE_JOURNEY_STARTED,
  });
  try {
    const data = await Service.createNewJourney(journeyData);
    dispatch({
      type: TYPES.CREATE_JOURNEY_SUCCESS,
      payload: {
        journey: data,
        notify: {
          message: "Rodada criada com sucesso!",
          type: "success",
        },
      },
    });
  } catch (error) {
    if (error?.response?.data?.code === "auth/id-token-expired") {
      dispatch(userActions.logoutGoogle());
      dispatch({
        type: TYPES.CREATE_JOURNEY_ERROR,
        payload: {
          notify: {
            message: "Por Favor, faça login novamente.",
            type: "error",
          },
        },
      });
    }
    console.log("userReducer", error);
  }
};

const update = (journeyData) => async (dispatch) => {
  dispatch({
    type: TYPES.UPDATE_JOURNEY_STARTED,
  });
  try {
    const data = await Service.updateJourney(journeyData);
    dispatch({
      type: TYPES.UPDATE_JOURNEY_SUCCESS,
      payload: {
        journey: data,
        notify: {
          message: "Rodada atualizada!",
          type: "success",
        },
      },
    });
  } catch (error) {
    if (error?.response?.data?.code === "auth/id-token-expired") {
      dispatch(userActions.logoutGoogle());
      dispatch({
        type: TYPES.UPDATE_JOURNEY_ERROR,
        payload: {
          notify: {
            message: "Por Favor, faça login novamente.",
            type: "error",
          },
        },
      });
    }
    console.log("userReducer", error);
  }
};

const close = (journeyId) => async (dispatch) => {
  dispatch({
    type: TYPES.CLOSE_JOURNEY_STARTED,
  });
  try {
    await Service.closeJourney(journeyId);
    dispatch(get());
    dispatch({
      type: TYPES.CLOSE_JOURNEY_SUCCESS,
      payload: {
        notify: {
          message: "Rodada encerrada.",
          type: "success",
        },
      },
    });
  } catch (error) {
    if (error?.response?.data?.code === "auth/id-token-expired") {
      dispatch(userActions.logoutGoogle());
      dispatch({
        type: TYPES.CLOSE_JOURNEY_ERROR,
        payload: {
          notify: {
            message: "Por Favor, faça login novamente.",
            type: "error",
          },
        },
      });
    }
    console.log("userReducer", error);
  }
};

export const journeyActions = {
  get,
  create,
  update,
  close,
};
