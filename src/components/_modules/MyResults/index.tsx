import { twMerge } from "tailwind-merge";
import { ComponentProps, Suspense } from "react";
import { auth } from "@/auth";
import { MyResultCard } from "./MyResultCard";

async function MyResultsList() {
  const session = await auth();

  return (
    <>
      <MyResultCard.Container>
        <MyResultCard.IconWrapper>
          <MyResultCard.Icon alt="Trophy icon" src="/icons/trophy.svg" />
        </MyResultCard.IconWrapper>
        <MyResultCard.Details>
          <MyResultCard.Title>Pódios</MyResultCard.Title>
          <MyResultCard.Description>
            {session?.user?.podiums?.first} pódois
          </MyResultCard.Description>
        </MyResultCard.Details>
      </MyResultCard.Container>

      <MyResultCard.Container>
        <MyResultCard.IconWrapper>
          <MyResultCard.Icon alt="Points icon" src="/icons/points.svg" />
        </MyResultCard.IconWrapper>
        <MyResultCard.Details>
          <MyResultCard.Title>Total de pontos</MyResultCard.Title>
          <MyResultCard.Description>
            {session?.user?.points} pontos
          </MyResultCard.Description>
        </MyResultCard.Details>
      </MyResultCard.Container>
    </>
  );
}

function MyResultsListSkeleton() {
  return (
    <>
      <MyResultCard.Skeleton />
      <MyResultCard.Skeleton />
    </>
  );
}

export function MyResults({ className, ...rest }: ComponentProps<"section">) {
  return (
    <section className={twMerge("flex flex-col gap-4", className)} {...rest}>
      <h2 className="text-2xl font-bold">Meus resultados</h2>

      <Suspense fallback={<MyResultsListSkeleton />}>
        <MyResultsList />
      </Suspense>
    </section>
  );
}
