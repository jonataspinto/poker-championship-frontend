import { ConditionalRender } from "@/components/ui";
import { closeJourney, listPlayers } from "@/services/actions";
import { JourneyPodiumDialog } from "./JourneyPodiumDialog";
import { JourneyPodiumForm } from "./JourneyPodiumForm";
import { CloseJourney } from "./CloseJourney";

export async function JourneyActions({ journey }: { journey: JourneyDTO }) {
  const playersResponse = await listPlayers();
  const players = new Map(
    playersResponse?.map((player) => [player.id, player])
  );

  return (
    <div>
      <div className="flex flex-col gap-2">
        <ConditionalRender
          condition={!journey.hasClosed}
          fallback={
            <>
              <p className="truncate text-nowrap">
                <span className="font-bold">Status: </span>
                {journey?.hasClosed ? "Encerrada" : "Em andamento"}
              </p>
              <p className="truncate text-nowrap">
                <span className="font-bold">Encerrada por: </span>
                {journey?.closedBy && players?.get(journey?.closedBy)?.name}
              </p>
            </>
          }
        >
          <CloseJourney action={closeJourney} journey={journey} />

          <JourneyPodiumDialog>
            <JourneyPodiumForm journey={journey} players={players} />
          </JourneyPodiumDialog>
        </ConditionalRender>
      </div>
    </div>
  );
}
