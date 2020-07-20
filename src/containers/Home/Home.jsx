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
} from "@material-ui/core";
import { uuid } from "uuidv4";
import { playersActions } from "../../store/duks";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Home = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const { playersReducer } = useSelector((state) => state);

  const [players, setPlayers] = useState([]);

  useEffect(() => {
    dispatch(playersActions.fetch());
  }, []);

  useEffect(() => {
    setPlayers(playersReducer.data.players);
  }, [playersReducer]);

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
            </TableRow>
          </TableHead>
          <TableBody>
            {players && players.map((player, index) => (
              <TableRow key={player.name}>
                <TableCell component="th" scope="row">
                  {`${index} º`}
                </TableCell>
                <TableCell component="th" scope="row">
                  {player.name}
                </TableCell>
                <TableCell align="left">{player.points}</TableCell>
                { player
                  && Object.values(player.podiums).map((podium) => (
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

export default Home;
