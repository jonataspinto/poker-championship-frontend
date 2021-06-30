import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { v4 as uuid } from "uuid";
import { playersActions, userActions } from "../../store/duks";
import { RootState } from "../../store";
import { IPlayer } from "../../shared/interfaces";

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

export const Home = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const { playersReducer } = useSelector((state: RootState) => state);

  const [players, setPlayers] = useState<IPlayer[]>([]);

  useEffect(() => {
    dispatch(playersActions.fetch());
  }, [dispatch]);

  useEffect(() => {
    setPlayers(playersReducer.players);
  }, [playersReducer.players]);

  useEffect(() => {
    dispatch(userActions.get());
  }, [dispatch]);

  return (
    <>
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
                    alt={`imagem de ${player.displayName}`}
                    imgProps={{
                      style: {
                        borderRadius: "50%",
                      },
                    }}
                  >
                    {!player.photoURL && <UserTie style={{ width: "100%" }} />}
                  </Avatar>
                  {player.displayName}
                </TableCell>
                <TableCell align="left">{player?.points}</TableCell>
                { player?.podiums
                  && Object.values(player?.podiums).map((podium) => (
                    <TableCell key={uuid()} align="left">{podium}</TableCell>
                  ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
