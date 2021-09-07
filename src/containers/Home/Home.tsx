import React from "react";
import { Helmet } from "react-helmet";
import { TablePlayers } from "./Sections";
import { usePlayersData } from "../../contexts";

export const Home = () => {
  const { players } = usePlayersData();

  return (
    <>
      <Helmet>
        <title>{`Poker | Classificação Geral`}</title>
      </Helmet>
      <TablePlayers players={players} />
    </>
  );
};
