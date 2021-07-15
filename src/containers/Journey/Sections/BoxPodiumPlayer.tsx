import React from "react";

import {
  Typography,
  Chip,
  Avatar,
  Box,
} from "@material-ui/core";

import { IPlayer } from "../../../interfaces"

interface IBoxPodiumProps {
  player: IPlayer;
  label: React.ReactNode
}

export const BoxPodiumPlayer = ({ player, label }: IBoxPodiumProps) => (
  <Box display="flex" flexDirection="row">
    <Typography
      variant="subtitle2"
      style={{
        textTransform: "capitalize",
        display: "flex",
        alignItems: "center",
      }}
    >
      {label}
    </Typography>
    <Chip
      variant="outlined"
      size="medium"
      label={player.name}
      avatar={(
        <Avatar
          src={player?.photoURL}
        />
      )}
      style={{ marginLeft: "4px" }}
    />
  </Box>
);
