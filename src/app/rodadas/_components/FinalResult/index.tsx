import { ComponentProps, Suspense } from "react";
import { twMerge } from "tailwind-merge";
import { FinalResultCard } from "./FinalResultCard";

async function Container({ journeyId }: { journeyId: string }) {
  const { getJourneyById, listPlayers } = await import("@/services/actions");
  const journey = await getJourneyById(journeyId);
  const players = await listPlayers();
  const playersMap = new Map(players?.map((player) => [player.id, player]));

  const podium = Object.keys(journey.podium ?? {}).reduce<PlayerDTO[]>(
    (acc, current) => {
      const playerId = journey?.podium?.[current as keyof Podium];

      const player = playerId ? playersMap.get(playerId) : null;

      if (player) {
        acc.push(player);
      }

      return acc;
    },
    []
  );

  return podium?.map((player) => (
    <FinalResultCard.Container key={player.id}>
      <FinalResultCard.Icon
        src={player.photoURL ?? ""}
        alt={player.name}
        className="rounded-full"
        width={56}
        height={56}
      />
      <FinalResultCard.Details>
        <FinalResultCard.Title>{player.name}</FinalResultCard.Title>
        <FinalResultCard.Description>0 pontos</FinalResultCard.Description>
      </FinalResultCard.Details>
    </FinalResultCard.Container>
  ));
}

function ContainerSkeleton() {
  return Array.from("skele").map((key) => (
    <FinalResultCard.Skeleton
      key={key}
      iconClassName="rounded-full w-[56px] h-[56px]"
    />
  ));
}

export function FinalResult({
  journeyId,
  className,
  ...rest
}: ComponentProps<"section"> & { journeyId: string }) {
  return (
    <section className={twMerge("flex flex-col gap-4", className)} {...rest}>
      <h2 className="text-2xl font-bold">Resultado Final</h2>
      <div className="flex flex-col gap-4">
        <Suspense fallback={<ContainerSkeleton />}>
          <Container journeyId={journeyId} />
        </Suspense>
      </div>
    </section>
  );
}
