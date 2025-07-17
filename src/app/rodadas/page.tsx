import { Suspense } from "react";
import { JourneyList, JourneyListSkeleton } from "./_components";

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <Suspense fallback={<JourneyListSkeleton />}>
        <JourneyList />
      </Suspense>
    </div>
  );
}
