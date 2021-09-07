import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { TablePlayers } from "./Sections";
import { usePlayersData, useSeason } from "../../contexts";

export const Home = () => {
  const { players } = usePlayersData();
  const { season, loadOpenedSeason } = useSeason();

  useEffect(() => {
    loadOpenedSeason()
  }, [
    loadOpenedSeason
  ])

  return (
    <>
      <Helmet>
        <title>{`Poker | Classificação Geral`}</title>
      </Helmet>
      {season?.tag}
      <TablePlayers players={players} />
    </>
  );
};
