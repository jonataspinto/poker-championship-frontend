import React, { useCallback, useState } from 'react'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Typography,
  Chip,
  Divider,
  Box,
  Button
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { useHistory } from 'react-router-dom';

import * as Service from "../../../services/journey";

export const CreateJourney = ({
  players = [],
}) => {
  const [newJourney, setNewJourney] = useState({
    players: []
  });

  const history = useHistory();

  const addOrRemovePlayerfromJourney = useCallback((uuid) => {
    setNewJourney(prevState => {
      let index;

      const isIncluded = !!prevState.players.find((currentPlayer, position) => {
        index = position;

        return (
          currentPlayer === uuid
        )
      });

      if (!isIncluded) {
        return ({
          ...prevState,
          players: [...prevState.players, uuid]
        })
      } else {
        const draftPlayersList = [...prevState.players];

        draftPlayersList.splice(index, 1);

        return ({
          ...prevState,
          players: [...draftPlayersList]
        });
      }
    })
  }, [])

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
          {`Abrir nova rodada `}
        </Typography>
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
          <Typography
          variant="subtitle1"
          >
            {`Selecione os jogadores.`}
          </Typography>
          <Divider/>
          {players.length > 0 && (
            players.map(player => (
              <Chip
                key={player.uuid}
                size="medium"
                label={player.name}
                avatar={
                  <Avatar
                    src={player?.photoURL}
                  />
                }
                variant={
                  newJourney.players.includes(player.uuid)
                  ? "default"
                  : "outlined"
                }
                color={
                  newJourney.players.includes(player.uuid)
                  ? "primary"
                  : "default"
                }
                onClick={() => {
                  addOrRemovePlayerfromJourney(player.uuid)
                }}
              />
            ))
          )}
          <Divider />
          <Box
            display="grid"
            gridTemplateColumns="1fr 1fr"
            gridArea="1fr"
            gridColumnGap={8}
          >
            <Button
              variant="contained"
              onClick={() => {
                history.push("/")
              }}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                Service.createNewJourney(newJourney)
              }}
            >
              Confirmar
            </Button>
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}
