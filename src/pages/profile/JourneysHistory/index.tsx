import { twMerge } from "tailwind-merge";
import { ComponentProps, Suspense } from "react";
import { JourneysHistoryList } from "./JourneysHistoryList";
import { JourneysHistoryListSkeleton } from "./JourneysHistoryListSkeleton";

export function JourneysHistory({
  className,
  ...rest
}: ComponentProps<"section">) {
  return (
    <section className={twMerge("flex flex-col gap-4", className)} {...rest}>
      <h2 className="text-2xl font-bold">Histórico de Rodadas</h2>

      <Suspense fallback={<JourneysHistoryListSkeleton />}>
        <JourneysHistoryList />
      </Suspense>
    </section>
  );
}
