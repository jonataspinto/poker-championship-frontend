import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Paper } from "@material-ui/core";
import { Helmet } from "react-helmet";
import { journeyActions } from "../../store/duks";
import { JourneyList } from "./Sections/JourneyList";
import { CreateJourney } from "./Sections/CreateJourney";
import { RootState } from "../../store";

export const Journey = () => {
  const dispatch = useDispatch();

  const {
    players,
    journeys
  } = useSelector((state: RootState) => ({
    user: state.userReducer.user,
    isAuthenticated: state.userReducer.isAuthenticated,
    players: state.playersReducer.players,
    journeys: state.journeyReducer.journeys,
  }));

  useEffect(() => {
    dispatch(journeyActions.get());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>{`Poker | Rodadas`}</title>
      </Helmet>
      <CreateJourney
        players={players}
      />
      <Paper>
        <JourneyList
          journeys={journeys}
          players={players}
        />
      </Paper>
    </>
  );
};
