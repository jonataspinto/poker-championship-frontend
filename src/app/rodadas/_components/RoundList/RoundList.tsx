import Link from "next/link";
import { JourneyCard } from "../JourneyCard";

export async function RoundList() {
  const title = (_journey: JourneyDTO | RoundDTO) => `Rodada #${_journey?.tag}`;

  const journeyDate = (_journey: JourneyDTO | RoundDTO) => {
    if (!_journey?.updatedAt) {
      return "---";
    }

    return new Intl.DateTimeFormat("pt-BR", {
      month: "long",
      day: "numeric",
      year: "numeric"
    }).format(new Date(_journey?.updatedAt));
  };

  const { listSeasons } = await import("@/services/actions/seasons");

  const seasons = await listSeasons();

  const openedSeason = seasons.find((season) => !season.hasClosed);

  const journeys = openedSeason?.rounds;

  if (!journeys || journeys.length === 0) {
    return (
      <div className="flex items-center justify-center w-full h-64">
        <p className="text-gray-500">Nenhuma rodada encontrada</p>
      </div>
    );
  }

  return journeys?.map((journey) => (
    <Link key={journey.id} href={`rodadas/${journey.id}`}>
      <JourneyCard.Container className="justify-between items-center w-full">
        <JourneyCard.Details>
          <JourneyCard.Title>{title(journey)}</JourneyCard.Title>
          <JourneyCard.Description>
            {journeyDate(journey)} · {journey.players.length} Jogadores
          </JourneyCard.Description>
        </JourneyCard.Details>

        <JourneyCard.Icon
          src="/icons/arrow-left.svg"
          alt="arrow-left-icon"
          className="w-4 h-4"
        />
      </JourneyCard.Container>
    </Link>
  ));
}
