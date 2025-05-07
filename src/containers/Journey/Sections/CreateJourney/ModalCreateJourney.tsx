import React from "react";

import {
  Avatar,
  Chip,
  Divider,
  Box,
  DialogContent,
  DialogTitle
} from "@material-ui/core";

import { IPlayer, INewJourney } from "../../../../interfaces";

interface ModalCreateJourneyProps {
  players: IPlayer[];
  newJourney: INewJourney;
  addOrRemovePlayerFromJourney: (playerId: string) => void;
}

export const ModalCreateJourney = ({
  players,
  newJourney,
  addOrRemovePlayerFromJourney
}: ModalCreateJourneyProps) => (
  <>
    <DialogTitle>Selecione os jogadores.</DialogTitle>
    <Divider />
    <DialogContent>
      <Box display="flex" flexWrap="wrap" gridGap={16}>
        {players.length > 0 &&
          players.map((player) => (
            <Chip
              key={player.id}
              size="medium"
              label={player.name}
              avatar={<Avatar src={player?.photoURL} />}
              variant={
                newJourney.players.includes(player.id) ? "default" : "outlined"
              }
              color={
                newJourney.players.includes(player.id) ? "primary" : "default"
              }
              onClick={() => {
                addOrRemovePlayerFromJourney(player.id);
              }}
            />
          ))}
      </Box>
    </DialogContent>
  </>
);
