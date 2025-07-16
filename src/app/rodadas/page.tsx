import { Suspense } from "react";
import {
  CreateNewJourney,
  JourneyList,
  JourneyListSkeleton
} from "./_components";
import { GoBackButton } from "@/components";

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <GoBackButton />
      <Suspense
        fallback={
          <div className="animate-pulse bg-gray-600 w-48 h-11 rounded" />
        }
      >
        <CreateNewJourney />
      </Suspense>
      <div className="flex flex-col gap-4">
        <Suspense fallback={<JourneyListSkeleton />}>
          <JourneyList />
        </Suspense>
      </div>
    </div>
  );
}
