import { twMerge } from "tailwind-merge";
import { ComponentProps, Suspense } from "react";
import { lastJourneyPresentation } from "./lastJourneyPresentation";
import { MyResultCard } from "../MyResults/MyResultCard";

async function LastJourneyDetails() {
  const { winner, duration, participants, status } =
    await lastJourneyPresentation();

  return (
    <>
      <MyResultCard.Container>
        <MyResultCard.IconWrapper>
          <MyResultCard.Icon alt="Trophy icon" src="/icons/trophy.svg" />
        </MyResultCard.IconWrapper>
        <MyResultCard.Details>
          <MyResultCard.Title>Vencedor</MyResultCard.Title>
          <MyResultCard.Description>{winner}</MyResultCard.Description>
        </MyResultCard.Details>
      </MyResultCard.Container>

      <MyResultCard.Container>
        <MyResultCard.IconWrapper>
          <MyResultCard.Icon alt="Clock icon" src="/icons/duration.svg" />
        </MyResultCard.IconWrapper>
        <MyResultCard.Details>
          <MyResultCard.Title>Duração</MyResultCard.Title>
          <MyResultCard.Description>{duration}</MyResultCard.Description>
        </MyResultCard.Details>
      </MyResultCard.Container>

      <MyResultCard.Container>
        <MyResultCard.IconWrapper>
          <MyResultCard.Icon
            alt="Participants icon"
            src="/icons/participants.svg"
          />
        </MyResultCard.IconWrapper>
        <MyResultCard.Details>
          <MyResultCard.Title>Participantes</MyResultCard.Title>
          <MyResultCard.Description>{participants}</MyResultCard.Description>
        </MyResultCard.Details>
      </MyResultCard.Container>

      <MyResultCard.Container>
        <MyResultCard.IconWrapper>
          <MyResultCard.Icon alt="Status icon" src="/icons/flag.svg" />
        </MyResultCard.IconWrapper>
        <MyResultCard.Details>
          <MyResultCard.Title>Status</MyResultCard.Title>
          <MyResultCard.Description>{status}</MyResultCard.Description>
        </MyResultCard.Details>
      </MyResultCard.Container>
    </>
  );
}

export function LastJourneyDetailsSkeleton() {
  return (
    <>
      <MyResultCard.Skeleton />
      <MyResultCard.Skeleton />
      <MyResultCard.Skeleton />
      <MyResultCard.Skeleton />
    </>
  );
}

export function LastJourney({ className, ...rest }: ComponentProps<"section">) {
  return (
    <section className={twMerge("flex flex-col gap-4", className)} {...rest}>
      <h1 className="text-2xl font-bold">Última Rodada</h1>

      <Suspense fallback={<LastJourneyDetailsSkeleton />}>
        <LastJourneyDetails />
      </Suspense>
    </section>
  );
}
