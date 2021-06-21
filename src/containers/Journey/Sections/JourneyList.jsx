import React from 'react'
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
import { BoxPodiumPlayer } from "./BoxPodiumPlayer"

export const JourneyList = ({
  journeys = [],
  players = [],
}) => {

  return (
    <>
      {journeys.length > 0 && journeys.map(journey => {
        const closedBy = players.find(player => (
          player.uuid === journey.closedBy
        ));

        const podiums = Object.entries({
          primeiro: players.find(player => (
            player.uuid === journey.podium.first
          )),
          segundo: players.find(player => (
            player.uuid === journey.podium.second
          )),
          terceiro: players.find(player => (
            player.uuid === journey.podium.third
          )),
          quarto: players.find(player => (
            player.uuid === journey.podium.fourth
          )),
          quinto: players.find(player => (
            player.uuid === journey.podium.fifth
          ))
        }).map(position => ({
          label: position[0],
          player: {...position[1]}
        }));

        const otherScorers = Object.entries({
          "melhor mão": players.find(player => (
            player.uuid === journey.bestHand
          )),
          "maior eliminador": players.find(player => (
            player.uuid === journey.biggestEliminator
          )),
        }).map(position => ({
          label: position[0],
          player: {...position[1]}
        }))

        return (
          <Accordion key={journey.id}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography
              variant="subtitle1"
            >{`Rodada #${journey.tag}`}</Typography>
            {journey.hasClosed && (
              <Chip
                variant="outlined"
                size="small"
                icon={<Block fontSize="inherit" color="error"/>}
                label="Fechada"
                color="secondary"
                style={{ marginLeft: "4px" }}
              />
            )}
          </AccordionSummary>
          <AccordionDetails
            display="flex"
            flexdirection="column"
          >
            <Box
              display="flex"
              flexDirection="column"
              gridGap={16}
              width="100%"
            >
              <Chip
                variant="outlined"
                size="small"
                label={`Encerrada por: ${closedBy.name}`}
                avatar={
                  <Avatar
                    src={closedBy?.photoURL}
                  />
                }
                style={{ marginLeft: "4px" }}
              />
              <Divider/>
              {podiums.map(podium => (
                <BoxPodiumPlayer
                  key={podium.label}
                  player={podium.player}
                  label={`${podium.label} lugar: `}
                />
              ))}
              <Divider />
              {otherScorers.map(podium => (
                <BoxPodiumPlayer
                  key={podium.label}
                  player={podium.player}
                  label={podium.label}
                />
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>
        )
      })}
    </>
  )
}
