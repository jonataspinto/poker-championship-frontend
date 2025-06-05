import { twMerge } from "tailwind-merge";
import { ComponentProps, Suspense } from "react";

import { auth } from "@/auth";
import { MyResultCard } from "@/components/_modules/MyResults/MyResultCard";

async function List() {
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
        <MyResultCard.Container key={journey?.id}>
          <MyResultCard.IconWrapper>
            <MyResultCard.Icon alt="Trophy icon" src="/icons/trophy.svg" />
          </MyResultCard.IconWrapper>
          <MyResultCard.Details>
            <MyResultCard.Title>Rodada {journey?.tag}</MyResultCard.Title>
            <MyResultCard.Description>
              {podiumPosition(journey?.podium, playerId)}
            </MyResultCard.Description>
          </MyResultCard.Details>
        </MyResultCard.Container>
      ))}
    </>
  );
}

function ListSkeleton() {
  return (
    <>
      <MyResultCard.Skeleton />
      <MyResultCard.Skeleton />
      <MyResultCard.Skeleton />
      <MyResultCard.Skeleton />
    </>
  );
}

export function JourneyHistory({
  className,
  ...rest
}: ComponentProps<"section">) {
  return (
    <section className={twMerge("flex flex-col gap-4", className)} {...rest}>
      <h2 className="text-2xl font-bold">Histórico de Rodadas</h2>

      <Suspense fallback={<ListSkeleton />}>
        <List />
      </Suspense>
    </section>
  );
}
