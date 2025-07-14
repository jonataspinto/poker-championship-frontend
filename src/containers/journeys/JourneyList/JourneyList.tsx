import Link from "next/link";
import { JourneyCard } from "../JourneyCard";

export async function JourneyList() {
  const title = (_journey: JourneyDTO) => `Rodada #${_journey?.tag}`;

  const journeyDate = (_journey: JourneyDTO) => {
    if (!_journey?.updatedAt) {
      return "---";
    }

    return new Intl.DateTimeFormat("pt-BR", {
      month: "long",
      day: "numeric",
      year: "numeric"
    }).format(new Date(_journey?.updatedAt));
  };

  const { listJourneys } = await import("@/services/actions");

  const journeys = await listJourneys();

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
