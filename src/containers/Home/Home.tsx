import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";

import { playersActions, userActions } from "../../store/duks";
import { RootState } from "../../store";
import { IPlayer } from "../../shared/interfaces";
import { TablePlayers } from "./Sections";

export const Home = () => {
  const dispatch = useDispatch();

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
      <Helmet>
        <title>{`Poker | Classificação Geral`}</title>
      </Helmet>
      <TablePlayers players={players} />
    </>
  );
};
