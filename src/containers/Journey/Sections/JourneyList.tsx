import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Typography,
  Chip,
  Divider,
  Box
} from "@material-ui/core";
import { ExpandMore, Block } from "@material-ui/icons";
import { BoxPodiumPlayer } from "./BoxPodiumPlayer";
import { CloseOrUpdateJourney } from "./CloseOrUpdateJourney";
import { IJourney, IPlayer } from "../../../shared/interfaces"
import { formatDate } from "../../../utils";

interface JourneyListProps {
  journeys: IJourney[],
  players: IPlayer[]
}

export const JourneyList = ({
  journeys = [],
  players = [],
}: JourneyListProps) => {
  return (
    <>
      {journeys && journeys.length > 0 && journeys.map((journey) => {
        const closedBy = players.find((player) => (
          player.uuid === journey.closedBy
        ));

        const podiums = Object.entries({
          primeiro: players.find((player) => (
            player.uuid === journey.podium.first
          )),
          segundo: players.find((player) => (
            player.uuid === journey.podium.second
          )),
          terceiro: players.find((player) => (
            player.uuid === journey.podium.third
          )),
          quarto: players.find((player) => (
            player.uuid === journey.podium.fourth
          )),
          quinto: players.find((player) => (
            player.uuid === journey.podium.fifth
          )),
        }).map((position) => ({
          label: position[0],
          player: { ...position[1] },
        }));

        const otherScorers = Object.entries({
          "melhor mão": players.find((player) => (
            player.uuid === journey.bestHand
          )),
          "maior eliminador": players.find((player) => (
            player.uuid === journey.biggestEliminator
          )),
        }).map((position) => ({
          label: position[0],
          player: { ...position[1]},
        }));

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
                <>
                  {podiums.map((podium) => (
                    <BoxPodiumPlayer
                      key={podium.label}
                      player={podium.player as IPlayer }
                      label={`${podium.label} lugar: `}
                    />
                  ))}
                  <Divider />
                  {otherScorers.map((podium) => (
                    <BoxPodiumPlayer
                      key={podium.label}
                      player={podium.player as IPlayer }
                      label={podium.label}
                    />
                  ))}
                  <Divider />
                  <Chip
                    variant="outlined"
                    size="small"
                    label={`Encerrada por: ${closedBy?.name}`}
                    avatar={(
                      <Avatar
                        src={closedBy?.photoURL}
                      />
                    )}
                    style={{ marginLeft: "4px" }}
                  />
                </> ) : (
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
