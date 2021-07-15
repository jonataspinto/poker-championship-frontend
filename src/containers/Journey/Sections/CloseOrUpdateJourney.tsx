import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Avatar,
  Chip,
  Divider,
  Box,
  Button,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";

import { makeStyles } from '@material-ui/core/styles';
import { IJourney, IPlayer } from "../../../interfaces";
import { useModal } from "../../../contexts";
import { JourneyIsComplete } from "../../../utils";
import { useJourney } from "../../../contexts/Journey";

interface CloseOrUpdateJourneyProps {
  players: IPlayer[],
  journey: IJourney
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  group: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    width: '100%',
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export const CloseOrUpdateJourney = ({ players, journey }: CloseOrUpdateJourneyProps) => {
  const { showModal, isOpen } = useModal();
  const [journeyData, setJourneyData] = useState<IJourney>(journey);
  const [shouldCloseJourney, setShouldCloseJourney] = useState(false);

  const classes = useStyles();

  const { updateJourney, closeJourney } = useJourney();

  const handleUpdateJourney = () => {
    updateJourney(journeyData);
  }

  const handleCLoseJourney = () => {
    closeJourney(journeyData.id as string);
  }

  const ActionsModalCloseJourney = {
    agree: () => {
      handleUpdateJourney()
    },
    disAgree: () => {

    }
  }

  function handleChange(event: ChangeEvent<any>, nestedRef?: string) {
    if(nestedRef){
      return setJourneyData(oldValues => {
        const draft = oldValues["podium"]

          return ({
          ...oldValues,
          [nestedRef]: {
            ...draft,
            [event.target.name]: event.target.value,
          }
        })
      });
    }
    setJourneyData(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
  }

  const RenderItem = (player: IPlayer) => (
    <MenuItem
      key={player?.uuid}
      value={player?.uuid}
    >
      <Chip
        size="medium"
        label={player?.name}
        avatar={(
          <Avatar
            src={player?.photoURL}
          />
        )}
        variant="outlined"
        color="default"
      />
    </MenuItem>
  )

  const ModalCloseJourney = (
    <>
      <DialogTitle>
        Selecione os jogadores.
      </DialogTitle>
        <Divider />
      <DialogContent>
        <Box
          display="flex"
          flexWrap="wrap"
          gridGap={16}
        >
          <form
            className={classes.root}
            autoComplete="off"
          >
            <FormControl
              className={classes.formControl}
            >
              <InputLabel htmlFor="first">Primeiro Lugar</InputLabel>
              <Select
                value={journeyData.podium.first}
                onChange={(event) => handleChange(event, "podium")}
                inputProps={{
                  name: 'first',
                  id: 'first',
                }}
              >{
                players.map(player => RenderItem(player))
              }
              </Select>
            </FormControl>

            <FormControl
              className={classes.formControl}
            >
              <InputLabel htmlFor="second">Sagundo Lugar</InputLabel>
              <Select
                value={journeyData.podium.second}
                onChange={(event) => handleChange(event, "podium")}
                inputProps={{
                  name: 'second',
                  id: 'second',
                }}
              >{
                players.map(player => RenderItem(player))
              }
              </Select>
            </FormControl>

            <FormControl
              className={classes.formControl}
            >
              <InputLabel htmlFor="third">Terceiro Lugar</InputLabel>
              <Select
                value={journeyData.podium.third}
                onChange={(event) => handleChange(event, "podium")}
                inputProps={{
                  name: 'third',
                  id: 'third',
                }}
              >{
                players.map(player => RenderItem(player))
              }
              </Select>
            </FormControl>

            <FormControl
              className={classes.formControl}
            >
              <InputLabel htmlFor="fourth">Quarto Lugar</InputLabel>
              <Select
                value={journeyData.podium.fourth}
                onChange={(event) => handleChange(event, "podium")}
                inputProps={{
                  name: 'fourth',
                  id: 'fourth',
                }}
              >{
                players.map(player => RenderItem(player))
              }
              </Select>
            </FormControl>

            <FormControl
              className={classes.formControl}
            >
              <InputLabel htmlFor="fifth">Quinto Lugar</InputLabel>
              <Select
                value={journeyData.podium.fifth}
                onChange={(event) => handleChange(event, "podium")}
                inputProps={{
                  name: 'fifth',
                  id: 'fifth',
                }}
              >{
                players.map(player => RenderItem(player))
              }
              </Select>
            </FormControl>

            <Divider />
            <span className={classes.group}>
            <FormControl
              className={classes.formControl}
            >
              <InputLabel htmlFor="bestHand">Melhor Mão</InputLabel>
              <Select
                value={journeyData.bestHand}
                onChange={(event) => handleChange(event)}
                inputProps={{
                  name: 'bestHand',
                  id: 'bestHand',
                }}
              >{
                players.map(player => RenderItem(player))
              }
              </Select>
            </FormControl>
            <FormControl
              className={classes.formControl}
            >
              <InputLabel htmlFor="biggestEliminator">Maior ELiminador</InputLabel>
              <Select
                value={journeyData.biggestEliminator}
                onChange={(event) => handleChange(event)}
                inputProps={{
                  name: 'biggestEliminator',
                  id: 'biggestEliminator',
                }}
              >{
                players.map(player => RenderItem(player))
              }
              </Select>
            </FormControl>
            </span>
          </form>
        </Box>
      </DialogContent>
    </>
  )

  // eslint-disable-next-line
  const handleShowModal = () => {
    if(isOpen) {
      showModal(
        ModalCloseJourney,
        ActionsModalCloseJourney
      )
    }
  }

  useEffect(() => {
    handleShowModal()
    setShouldCloseJourney(JourneyIsComplete(journeyData))
    // eslint-disable-next-line
  }, [
    journeyData
  ])

  return (
    <Box
      display="flex"
      gridGap={16}
      pb={3}
    >
      <Button
        disabled={!shouldCloseJourney}
        variant="outlined"
        color="secondary"
        onClick={handleCLoseJourney}
      >
        Fechar Rodada
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => showModal(
          ModalCloseJourney,
          ActionsModalCloseJourney
        )}
      >
        Atribuir Pontuação.
      </Button>
    </Box>
  );
};
