import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button
} from "@material-ui/core";

import { IPlayer, INewJourney } from "../../../../interfaces";
import { useModal } from "../../../../contexts";
import { formatDateToIso } from "../../../../utils";
import { useJourney } from "../../../../contexts/Journey";
import { ModalCreateJourney } from "./ModalCreateJourney"

interface CreateJourneyProps {
  players: IPlayer[],
}

export const CreateJourney = ({ players }: CreateJourneyProps) => {
  const { showModal, isOpen } = useModal();
  const [newJourney, setNewJourney] = useState<INewJourney>({
    players: [],
    createdAt: formatDateToIso(new Date())
  });

  const { createJourney } = useJourney();

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
      createJourney(newJourney);
    },
    disAgree: () => {

    }
  }

  // eslint-disable-next-line
  const handleShowModal = () => {
    if(isOpen) {
      showModal(
        <ModalCreateJourney
          players={players}
          newJourney={newJourney}
          addOrRemovePlayerfromJourney={addOrRemovePlayerfromJourney}
        />,
        ActionsModalCreateJourney
      )
    }
  }

  useEffect(() => {
    handleShowModal()
    // eslint-disable-next-line
  }, [
    newJourney.players.length
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
          <ModalCreateJourney
            players={players}
            newJourney={newJourney}
            addOrRemovePlayerfromJourney={addOrRemovePlayerfromJourney}
          />,
          ActionsModalCreateJourney
        )}
      >
        Abrir nova rodada.
      </Button>
    </Box>
  );
};
