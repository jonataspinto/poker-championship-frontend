import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Paper } from "@material-ui/core";
import { Helmet } from "react-helmet";
import { JourneyList } from "./Sections/JourneyList";
import { CreateJourney } from "./Sections/CreateJourney";
import { RootState } from "../../store";
import { useJourney } from "../../contexts/Journey";

export const Journey = () => {
  const {
    players,
  } = useSelector((state: RootState) => ({
    players: state.playersReducer.players,
  }));

  const { journeys , fetchJourneys } = useJourney();

  useEffect(() => {
    fetchJourneys()
  }, [
    fetchJourneys
  ]);

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
