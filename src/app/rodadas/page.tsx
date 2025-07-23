import { Suspense } from "react";
import { JourneyList, JourneyListSkeleton, RoundList } from "./_components";

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <Suspense fallback={<JourneyListSkeleton />}>
        RoundList
        <RoundList />
        RoundList
        <JourneyList />
      </Suspense>
    </div>
  );
}
