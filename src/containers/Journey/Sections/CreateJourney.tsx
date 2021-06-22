import React, { useCallback, useEffect, useState } from "react";
import {
  Avatar,
  Chip,
  Divider,
  Box,
  Button,
  DialogContent,
  DialogTitle
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

import * as Service from "../../../services/journey";
import { IPlayer } from "../../../shared/interfaces";
import { useModal } from "../../../contexts";

interface CreateJourneyProps {
  players: IPlayer[],
}

export const CreateJourney = ({ players }: CreateJourneyProps) => {
  const { showModal, isOpen } = useModal();
  const [newJourney, setNewJourney] = useState<{ players: string[] }>({
    players: [],
  });

  const history = useHistory();

  const addOrRemovePlayerfromJourney = useCallback((uuid) => {
    setNewJourney((prevState) => {
      let index = 0;

      const isIncluded = !!prevState.players.find((currentPlayer, position) => {
        index = position;

        return (
          currentPlayer === uuid
        );
      });

      if (!isIncluded) {
        return ({
          ...prevState,
          players: [...prevState.players, uuid],
        });
      }
      const draftPlayersList = [...prevState.players];

      draftPlayersList.splice(index, 1);

      return ({
        ...prevState,
        players: [...draftPlayersList],
      });
    });
  }, []);

  const ActionsModalCreateJourney = {
    agree: () => {
      console.warn("criando newJourney",newJourney);
      Service.createNewJourney(newJourney)
    },
    disAgree: () => {
      history.push("/");
    }
  }

  const ModalCreateJourney = (
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
          {players.length > 0 && (
            players.map((player) => (
              <Chip
                key={player.uuid}
                size="medium"
                label={player.name}
                avatar={(
                  <Avatar
                    src={player?.photoURL}
                  />
                )}
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
                  addOrRemovePlayerfromJourney(player.uuid);
                }}
              />
            ))
          )}
        </Box>
      </DialogContent>
    </>
  )

  // eslint-disable-next-line
  const handleShowModal = () => {
    if(isOpen) {
      showModal(
        ModalCreateJourney,
        ActionsModalCreateJourney
        )
      }
    }

    useEffect(() => {
      handleShowModal()
      // eslint-disable-next-line
  }, [
    newJourney.players.length,
    // handleShowModal
  ])

  return (
    <Box
      display="flex"
      pb={3}
    >
      <Button
        variant="outlined"
        color="primary"
        onClick={() => showModal(
          ModalCreateJourney,
          ActionsModalCreateJourney
        )}
      >
        Abrir nova rodada.
      </Button>
    </Box>
  );
};
