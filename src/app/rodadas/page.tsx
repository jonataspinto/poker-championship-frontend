import { Suspense } from "react";
// import { PageContainer } from "@/components";
// import { Divider } from "@/components/Divider";
// import { Podium } from "./_components/Podium";
// import { BestHandAndEliminator } from "./_components/BestHandAndEliminator";
// import { JourneyActions } from "./_components/JourneyActions";
import { CreateNewJourney } from "./_components/CreateNewJourney";
import { JourneyCard } from "./_components/JourneyCard";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <CreateNewJourney />
      <div className="flex flex-col gap-4">
        <Suspense fallback={<>Carregando...</>}>
          <JourneyList />
        </Suspense>
      </div>
    </>
  );
}

async function JourneyList() {
  const title = (_journey: JourneyDTO) => `Rodada #${_journey?.tag}`;

  const journeyDate = (_journey: JourneyDTO) => {
    return new Intl.DateTimeFormat("pt-BR", {
      month: "long",
      day: "numeric",
      year: "numeric"
    }).format(new Date(_journey?.updatedAt));
  };

  const { listJourneys } = await import("@/services/actions");

  const journeys = await listJourneys();

  return journeys?.map((journey) => (
    <Link
      key={journey.id}
      href={`rodadas/${journey.id}`}
      className="flex max-w-96"
    >
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
