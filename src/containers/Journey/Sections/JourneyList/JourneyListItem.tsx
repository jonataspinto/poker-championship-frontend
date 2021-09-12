import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Chip,
  Box
} from "@material-ui/core";
import { ExpandMore, Block } from "@material-ui/icons";
import { CloseOrUpdateJourney } from "./CloseOrUpdateJourney";
import { IJourney, IPlayer } from "../../../../interfaces"
import { formatDate, MapPodiumJourney } from "../../../../utils";
import { BoxPodium } from "../../../../components/modules";

interface JourneyListItemProps {
  journey: IJourney,
  players: IPlayer[],
}

export const JourneyListItem = ({ journey, players = [] }: JourneyListItemProps) => {
  const { closedBy, podiums, otherScorers } = MapPodiumJourney(journey, players);

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography
          variant="subtitle1"
        >
          {`Rodada #${journey.tag} - ${formatDate(new Date(journey.createdAt), "dd/MM/yy")} `}
        </Typography>
        {journey.hasClosed && (
          <Chip
            variant="outlined"
            size="small"
            icon={<Block fontSize="inherit" color="error" />}
            label="Fechada"
            color="secondary"
            style={{ marginLeft: "4px" }}
          />
        )}
      </AccordionSummary>
      <AccordionDetails
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          gridGap={16}
          width="100%"
        >{
          journey.hasClosed ? (
            <BoxPodium
              podiums={podiums}
              otherScorers={otherScorers}
              closedBy={closedBy}
            />
          ) : (
            <CloseOrUpdateJourney
              players={journey.players.map(playerIdInJourney => (
                  players.find(player => player.uuid === playerIdInJourney)
                )) as IPlayer[]
              }
              journey={journey}
            />
          )}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
