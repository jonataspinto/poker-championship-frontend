import { JourneyServices, RefreshIdToken } from "../../services";
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
    case TYPES.UPDATE_JOURNEY_SUCCESS: {
      const draftStateJourneys = state.journeys;

      draftStateJourneys.splice(
        state.journeys.findIndex((journey) => (
          journey.uuid === action.payload.journey.uuid
        )),
        1,
        action.payload.journey,
      );

      return {
        ...state,
        journeys: draftStateJourneys,
        notify: action.payload.notify,
        loading: false,
      };
    }
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
    const data = await JourneyServices.getAllJourneys();
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
      await RefreshIdToken(({ status }) => {
        if (status === "success") {
          return dispatch(get());
        }
        dispatch(userActions.logoutGoogle());
        return dispatch({
          type: TYPES.GET_JOURNEY_SUCCESS,
          payload: {
            notify: {
              message: "Por Favor, faça login novamente.",
              type: "error",
            },
          },
        });
      });
    }
  }
};

const create = (journeyData) => async (dispatch) => {
  dispatch({
    type: TYPES.CREATE_JOURNEY_STARTED,
  });
  try {
    const data = await JourneyServices.createNewJourney(journeyData);
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
      await RefreshIdToken(({ status }) => {
        if (status === "success") {
          return dispatch(create(journeyData));
        }
        dispatch(userActions.logoutGoogle());
        return dispatch({
          type: TYPES.CREATE_JOURNEY_ERROR,
          payload: {
            notify: {
              message: "Por Favor, faça login novamente.",
              type: "error",
            },
          },
        });
      });
    }
  }
};

const update = (journeyData) => async (dispatch) => {
  dispatch({
    type: TYPES.UPDATE_JOURNEY_STARTED,
  });
  try {
    const data = await JourneyServices.updateJourney(journeyData);
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
      await RefreshIdToken(({ status }) => {
        if (status === "success") {
          return dispatch(update(journeyData));
        }
        dispatch(userActions.logoutGoogle());
        return dispatch({
          type: TYPES.UPDATE_JOURNEY_ERROR,
          payload: {
            notify: {
              message: "Por Favor, faça login novamente.",
              type: "error",
            },
          },
        });
      });
    }
  }
};

const close = (journeyId) => async (dispatch) => {
  dispatch({
    type: TYPES.CLOSE_JOURNEY_STARTED,
  });
  try {
    await JourneyServices.closeJourney(journeyId);
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
      await RefreshIdToken(({ status }) => {
        if (status === "success") {
          return dispatch(close(journeyId));
        }
        dispatch(userActions.logoutGoogle());
        return dispatch({
          type: TYPES.CLOSE_JOURNEY_ERROR,
          payload: {
            notify: {
              message: "Por Favor, faça login novamente.",
              type: "error",
            },
          },
        });
      });
    }
  }
};

export const journeyActions = {
  get,
  create,
  update,
  close,
};
