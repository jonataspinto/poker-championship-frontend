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
import { IJourney, IPlayer, Status } from "../../../interfaces"
import { formatDate, MapPodiumJourney } from "../../../utils";
import { BoxPodium } from "./BoxPodium";

interface JourneyListProps {
  journeys: IJourney[],
  players: IPlayer[],
  status?: Status
}

export const JourneyList = ({
  journeys = [],
  players = [],
  status
}: JourneyListProps) => {
  const Sckeleton = (
    <div>{status}</div>
  )

  return (status === Status.LOADING ? Sckeleton :
    <>
      {journeys && journeys.length > 0 && journeys.map((journey) => {
        const { closedBy, podiums, otherScorers } = MapPodiumJourney(journey, players);

        return (
          <Accordion key={journey.id}>
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
      })}
    </>
  )
};
