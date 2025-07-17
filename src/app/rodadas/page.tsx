import { Suspense } from "react";
import { JourneyList, JourneyListSkeleton } from "./_components";
import { GoBackButton } from "@/components";

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <GoBackButton />
      <div className="flex flex-col gap-4">
        <Suspense fallback={<JourneyListSkeleton />}>
          <JourneyList />
        </Suspense>
      </div>
    </div>
  );
}
