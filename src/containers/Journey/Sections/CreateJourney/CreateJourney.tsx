import React, { useCallback, useEffect, useState } from "react";
import { Box, Button } from "@material-ui/core";

import { IPlayer, INewJourney } from "../../../../interfaces";
import { useAuth, useModal, useSeason } from "../../../../contexts";
import { formatDateToIso } from "../../../../utils";
import { useJourney } from "../../../../contexts/Journey";
import { ModalCreateJourney } from "./ModalCreateJourney";

interface CreateJourneyProps {
  players: IPlayer[];
}

export const CreateJourney = ({ players }: CreateJourneyProps) => {
  const { showModal, isOpen } = useModal();
  const [newJourney, setNewJourney] = useState<INewJourney>({
    players: [],
    createdAt: formatDateToIso(new Date()),
    seasonId: ""
  });

  const { createJourney } = useJourney();

  const { isAuthenticated, user } = useAuth();

  const { season, updateSeason } = useSeason();

  const seasonId = season?.id || "";

  const journeysIds = season?.journeys || [];

  const addOrRemovePlayerFromJourney = useCallback((id) => {
    setNewJourney((prevState) => {
      let index = 0;

      const isIncluded = !!prevState.players.find((currentPlayer, position) => {
        index = position;

        return currentPlayer === id;
      });

      if (!isIncluded) {
        return {
          ...prevState,
          players: [...prevState.players, id]
        };
      }
      const draftPlayersList = [...prevState.players];

      draftPlayersList.splice(index, 1);

      return {
        ...prevState,
        players: [...draftPlayersList]
      };
    });
  }, []);

  const ActionsModalCreateJourney = {
    agree: () => {
      createJourney(
        { ...newJourney, seasonId },
        async (journeyId: string) =>
          await updateSeason({
            ...season,
            journeys: [...journeysIds, journeyId]
          })
      );
    },
    disAgree: () => {}
  };

  const handleShowModal = () => {
    if (isOpen) {
      showModal(
        <ModalCreateJourney
          players={players}
          newJourney={newJourney}
          addOrRemovePlayerFromJourney={addOrRemovePlayerFromJourney}
        />,
        ActionsModalCreateJourney
      );
    }
  };

  useEffect(() => {
    setNewJourney((prevState) => ({
      ...prevState,
      players: players.length > 0 ? players.map((player) => player.id) : []
    }));
  }, [players]);

  useEffect(() => {
    handleShowModal();
    // eslint-disable-next-line
  }, [newJourney.players.length]);

  return (
    <Box display="flex" pb={3}>
      <Button
        variant="outlined"
        color="primary"
        disabled={!isAuthenticated && !user?.isAdmin}
        onClick={() =>
          showModal(
            <ModalCreateJourney
              players={players}
              newJourney={newJourney}
              addOrRemovePlayerFromJourney={addOrRemovePlayerFromJourney}
            />,
            ActionsModalCreateJourney
          )
        }
      >
        Abrir nova rodada.
      </Button>
    </Box>
  );
};
