import React from "react";
import { Avatar, Chip, Divider } from "@material-ui/core";
import { BoxPodiumPlayer } from "./BoxPodiumPlayer";
import { IPlayer } from "interfaces";

type PodiumUI = {
  label?: string | number,
  player?: IPlayer
}

interface IBoxPodiumProps {
  podiums?: Array<PodiumUI>,
  otherScorers?: Array<PodiumUI>,
  closedBy?: IPlayer
}

export const BoxPodium = ({ podiums, otherScorers, closedBy }: IBoxPodiumProps) => {
  return (
    <>
      {podiums?.map((podium) => (
        <BoxPodiumPlayer
          key={podium.label}
          player={podium.player as IPlayer }
          label={`${podium.label} lugar: `}
        />
      ))}
      <Divider />
      {otherScorers?.map((podium) => (
        <BoxPodiumPlayer
          key={podium.label}
          player={podium.player as IPlayer}
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
    </>
  )
}
