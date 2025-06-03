import { getPlayerById, listJourneys } from "@/services/actions";

const calcDuration = (createdAt: string | Date, updatedAt: string | Date) => {
  const start = new Date(createdAt);
  const end = new Date(updatedAt);

  let duration = Math.abs(end.getTime() - start.getTime());

  const hours = Math.floor(duration / (1000 * 60 * 60));
  duration -= hours * 1000 * 60 * 60;
  const minutes = Math.floor(duration / (1000 * 60));

  let result = "";
  if (hours > 0) result += `${hours} hora${hours > 1 ? "s" : ""}`;
  if (hours > 0 && minutes > 0) result += " e ";
  if (minutes > 0) result += `${minutes} minuto${minutes > 1 ? "s" : ""}`;
  if (!result) result = "menos de 1 minuto";

  return result;
};

export async function lastJourneyPresentation() {
  const journeys = await listJourneys();

  const lastJourney = journeys[0];

  let winner = lastJourney?.closedBy ? "" : "Sem vencedor";

  if (lastJourney?.podium?.first) {
    const { name } = await getPlayerById(lastJourney?.podium?.first);

    winner = name || "";
  }

  const duration = calcDuration(lastJourney.createdAt, lastJourney.updatedAt);

  const participants = lastJourney.players.length;

  const status = lastJourney.hasClosed ? "Encerrada" : "Em andamento";

  return {
    winner,
    duration,
    participants,
    lastJourney,
    status
  };
}
