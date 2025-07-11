import { ComponentProps, Suspense } from "react";
import { twMerge } from "tailwind-merge";
import { JourneyPoints } from "@/utils";
import { FinalResultCard } from "./FinalResultCard";

async function Container({ journeyId }: { journeyId: string }) {
  const { getJourneyById, listPlayers } = await import("@/services/actions");
  const journey = await getJourneyById(journeyId);
  const players = await listPlayers();
  const playersMap = new Map(players?.map((player) => [player.id, player]));
  const podiumKeys = Object.keys(journey.podium ?? {}) as Array<keyof Podium>;

  return podiumKeys.map((podiumKey) => {
    const playerId = journey?.podium?.[podiumKey];

    const player = playerId ? playersMap.get(playerId) : null;

    const points = JourneyPoints[podiumKey];

    if (player) {
      return (
        <FinalResultCard.Container
          key={`final-result-${podiumKey}_${player.id}`}
        >
          <FinalResultCard.Icon
            src={player.photoURL ?? ""}
            alt={player.name}
            className="rounded-full"
            width={56}
            height={56}
          />
          <FinalResultCard.Details>
            <FinalResultCard.Title>{player.name}</FinalResultCard.Title>
            <FinalResultCard.Description>
              + {points} {points > 1 ? "pontos" : "ponto"}
            </FinalResultCard.Description>
          </FinalResultCard.Details>
        </FinalResultCard.Container>
      );
    }
  });
}

function ContainerSkeleton() {
  return Array.from("skltn").map((key) => (
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
