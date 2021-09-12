import React from "react";
import { Paper } from "@material-ui/core";
import { Helmet } from "react-helmet";
import { JourneyList } from "./Sections/JourneyList";
import { CreateJourney } from "./Sections/CreateJourney";
import { useJourney, usePlayersData } from "../../contexts";

export const Journey = () => {
  const { journeys, status } = useJourney();

  const { players } = usePlayersData();

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
          status={status}
        />
      </Paper>
    </>
  );
};
