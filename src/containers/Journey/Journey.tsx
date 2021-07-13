import React, { useEffect } from "react";
import { Paper } from "@material-ui/core";
import { Helmet } from "react-helmet";
import { JourneyList } from "./Sections/JourneyList";
import { CreateJourney } from "./Sections/CreateJourney";
import { useJourney, usePlayersData } from "../../contexts";

export const Journey = () => {
  const { journeys , fetchJourneys } = useJourney();
  const { players } = usePlayersData();

  useEffect(() => {
    fetchJourneys();
  }, [
    fetchJourneys,
  ]);

  return (
    <>
      <Helmet>
        <title>{`Poker | Rodadas`}</title>
      </Helmet>
      <CreateJourney
        players={players}
      />
      <Paper>{
        players.length > 0 && journeys.length > 0 && (
          <JourneyList
            journeys={journeys}
            players={players}
          />
        )}
      </Paper>
    </>
  );
};
