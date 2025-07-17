import { Suspense } from "react";
import { GoBackButton } from "@/components";
import { CreateNewJourney } from "../_components/CreateNewJourney";
import { CreateNewSeason } from "../_components/CreateNewSeason";

export default function Page() {
  return (
    <>
      <div className="flex flex-col gap-4">
        <GoBackButton />
        <Suspense
          fallback={
            <div className="animate-pulse bg-gray-600 w-48 h-11 rounded" />
          }
        >
          <CreateNewJourney />
        </Suspense>

        <CreateNewSeason />
      </div>
    </>
  );
}
