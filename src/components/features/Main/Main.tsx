import { useEffect } from 'react';
import { useJourney, usePlayersData, useSeason } from 'contexts';

export const Main = ({ children }) => {

  const { fetchSeasons } = useSeason();
  const { fetchJourneys } = useJourney();
  const { fetchPlayers } = usePlayersData();

  useEffect(() => {
    fetchSeasons();
    fetchJourneys();
    fetchPlayers();

    // eslint-disable-next-line
  }, []);

  return children
}
