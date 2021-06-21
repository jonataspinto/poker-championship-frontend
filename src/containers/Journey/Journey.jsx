import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Paper
} from "@material-ui/core";
import { journeyActions, /* playersActions */ } from "../../store/duks";
import { JourneyList } from "./Sections/JourneyList";
import { CreateJourney } from "./Sections/CreateJourney";

export const Journey = () => {
  const dispatch = useDispatch();

  const { user, isAuthenticated, players, journeys} = useSelector((state) => ({
    user: state.userReducer.user,
    isAuthenticated: state.userReducer.isAuthenticated,
    players: state.playersReducer.players,
    journeys: state.journeyReducer.journeys
  }));

  console.log({ user, isAuthenticated, players, journeys });

  useEffect(() => {
    dispatch(journeyActions.get());
  }, [dispatch]);

  return (
    <Paper >
      <CreateJourney
        journeys={journeys}
        players={players}
      />
      <JourneyList
        journeys={journeys}
        players={players}
      />
    </Paper>
  );
};
