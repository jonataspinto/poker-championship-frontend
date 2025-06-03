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
    <div className="container mx-auto px-4 py-8 md:grid md:grid-cols-2 md:grid-rows-3 md:gap-4">
      <Suspense fallback={<RankingSkeleton className="md:row-span-3" />}>
        <Ranking className="md:row-span-3" />
      </Suspense>

      <Suspense
        fallback={<MyResultsSkeleton className="max-md:mt-8 md:row-span-1" />}
      >
        <MyResults className="max-md:mt-8 md:row-span-1" />
      </Suspense>

      <Suspense
        fallback={<LastJourneySkeleton className="max-md:mt-8 md:row-span-1" />}
      >
        <LastJourney className="max-md:mt-8 md:row-span-1" />
      </Suspense>
    </div>
  );
}
