import { auth } from "@/auth";
import { LastJourneyCard } from "./LastJourneyCard";

export async function JourneysHistoryList() {
  const session = await auth();
  const playerId = session?.user?.id;
  let journeys: JourneyDTO[] = [];

  try {
    if (playerId) {
      const searchParams = new URLSearchParams({ playerId });
      const { listJourneys } = await import("@/services/actions");
      journeys = await listJourneys(searchParams);
    }
  } catch (error) {
    console.error("Error fetching journeys:", error);
  }

  if (!journeys || journeys.length === 0) {
    return <p className="text-gray-500">Nenhuma rodada encontrada.</p>;
  }

  const { podiumPosition } = await import("@/utils");

  return (
    <>
      {journeys.map((journey) => (
        <LastJourneyCard.Container key={journey?.id}>
          <LastJourneyCard.IconWrapper>
            <LastJourneyCard.Icon alt="Trophy icon" src="/icons/trophy.svg" />
          </LastJourneyCard.IconWrapper>
          <LastJourneyCard.Details>
            <LastJourneyCard.Title>Rodada {journey?.tag}</LastJourneyCard.Title>
            <LastJourneyCard.Description>
              {podiumPosition(journey?.podium, playerId)}
            </LastJourneyCard.Description>
          </LastJourneyCard.Details>
        </LastJourneyCard.Container>
      ))}
    </>
  );
}
