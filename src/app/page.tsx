import { Suspense } from "react";
import { Ranking, RankingSkeleton } from "@/components/_modules/Ranking";
import { MyResults, MyResultsSkeleton } from "@/components/_modules/MyResults";

export const metadata = {
  title: "Poker Championship",
  description: "A Next.js application for managing poker championships"
};

export default async function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<RankingSkeleton />}>
        <Ranking />
      </Suspense>

      <Suspense fallback={<MyResultsSkeleton />}>
        <MyResults />
      </Suspense>
    </div>
  );
}
