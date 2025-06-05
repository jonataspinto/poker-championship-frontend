import { ComponentProps, Suspense } from "react";
import { MyResultCard } from "@/components/_modules/MyResults/MyResultCard";
import { twMerge } from "tailwind-merge";

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
    <MyResultCard.Container key={player.id}>
      <MyResultCard.Icon
        src={player.photoURL ?? ""}
        alt={player.name}
        className="rounded-full"
        width={56}
        height={56}
      />
      <MyResultCard.Details>
        <MyResultCard.Title>{player.name}</MyResultCard.Title>
        <MyResultCard.Description>0 pontos</MyResultCard.Description>
      </MyResultCard.Details>
    </MyResultCard.Container>
  ));
}

function ContainerSkeleton() {
  return Array.from("skele").map((key) => (
    <MyResultCard.Skeleton
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
