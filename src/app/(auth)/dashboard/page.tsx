import { Suspense } from "react";

import {
  CloseSeason,
  CreateNewJourney,
  CreateNewRound,
  CreateNewSeason,
  SeasonDetails
} from "../_components";

export default function Page() {
  return (
    <div className="flex flex-col gap-4 pt-4">
      <div className="flex flex-wrap gap-4">
        <Suspense
          fallback={
            <div className="animate-pulse bg-gray-600 w-48 h-11 rounded" />
          }
        >
          <CreateNewRound />
        </Suspense>

        <Suspense
          fallback={
            <div className="animate-pulse bg-gray-600 w-48 h-11 rounded" />
          }
        >
          {/* TODO: remover após refactor da estrutura do firestore */}
          <CreateNewJourney />
        </Suspense>

        <CreateNewSeason />

        <CloseSeason />
      </div>

      <SeasonDetails />
    </div>
  );
}
