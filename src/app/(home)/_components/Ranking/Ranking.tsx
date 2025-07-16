import { twMerge } from "tailwind-merge";
import { ComponentProps, Suspense } from "react";
import { RankingListSkeleton } from "./RankingListSkeleton";
import { RankingList } from "./RankingList";

export function Ranking({ className, ...rest }: ComponentProps<"section">) {
  return (
    <section className={twMerge("flex flex-col gap-4", className)} {...rest}>
      <h1 className="text-2xl font-bold">Ranking</h1>
      <Suspense fallback={<RankingListSkeleton />}>
        <RankingList />
      </Suspense>
    </section>
  );
}
