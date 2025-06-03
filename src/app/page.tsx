import { Suspense } from "react";
import { Ranking, RankingSkeleton } from "@/components/_modules/Ranking";
import { MyResults, MyResultsSkeleton } from "@/components/_modules/MyResults";
import {
  LastJourney,
  LastJourneySkeleton
} from "@/components/_modules/LastJourney";

export const metadata = {
  title: "Poker Championship",
  description: "A Next.js application for managing poker championships"
};

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 home-grid-areas md:gap-8">
      <Suspense
        fallback={<RankingSkeleton className="home-grid-area__ranking" />}
      >
        <Ranking className="home-grid-area__ranking" />
      </Suspense>

      <Suspense
        fallback={
          <MyResultsSkeleton className="max-md:mt-8 home-grid-area__my-results" />
        }
      >
        <MyResults className="max-md:mt-8 home-grid-area__my-results" />
      </Suspense>

      <Suspense
        fallback={
          <LastJourneySkeleton className="max-md:mt-8 home-grid-area__last-journey" />
        }
      >
        <LastJourney className="max-md:mt-8 home-grid-area__last-journey" />
      </Suspense>
    </div>
  );
}
