import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
} from "@material-ui/core";
import { UserTie } from "styled-icons/fa-solid";

import { IPlayer } from "../../../interfaces";
import { formatStringToCapitalize } from "../../../utils";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  wrapperAvatar: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
  photo: {
    margin: theme.spacing(1),
    padding: "2px",
  },
}));

interface TablePlayersProps {
  players: Array<IPlayer>
}

export const TablePlayers = ({ players }: TablePlayersProps) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">#</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell align="left">Pontos</TableCell>
            <TableCell align="left">x 1º</TableCell>
            <TableCell align="left">x 2º</TableCell>
            <TableCell align="left">x 3º</TableCell>
            <TableCell align="left">x 4º</TableCell>
            <TableCell align="left">x 5º</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {players && players.map((player, index) => (
            <TableRow key={player.id}>
              <TableCell component="th" scope="row">
                {`${index + 1} º`}
              </TableCell>
              <TableCell component="th" scope="row" className={classes.wrapperAvatar}>
                <Avatar
                  className={player.photoURL ? classes.photo : classes.avatar}
                  src={player.photoURL && player.photoURL}
                  alt={`imagem de ${player.displayName || player.name}`}
                  imgProps={{
                    style: {
                      borderRadius: "50%",
                    },
                  }}
                >
                  {!player.photoURL && <UserTie style={{ width: "100%" }} />}
                </Avatar>
                {formatStringToCapitalize(player.displayName || player.name)}
              </TableCell>
              <TableCell align="left">{player?.points}</TableCell>
              { player?.podiums
                && Object.values(player?.podiums).map((podium, podiumIndex) => {
                  const podiumMapKey = `${player.id}-podium${player.name}-${podiumIndex}`;
                  return (
                    <TableCell
                      key={podiumMapKey}
                      align="left"
                    >
                      {podium}
                    </TableCell>
                  )
                })
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
