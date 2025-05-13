import { ConditionalRender } from "@/components/ConditionalRender";
import { closeJourney, PlayerService } from "@/services/actions";
import { JourneyPodiumDialog } from "./JourneyPodiumDialog";
import { JourneyPodiumForm } from "./JourneyPodiumForm";
import { CloseJourney } from "./CloseJourney";

export async function JourneyActions({ journey }: { journey: JourneyDTO }) {
  const playersResponse = await PlayerService.list();
  const players = new Map(
    playersResponse?.map((player) => [player.id, player])
  );

  return (
    <div className="px-4">
      <ConditionalRender
        condition={!journey.hasClosed}
        fallback={
          <p className="truncate text-nowrap">
            <span className="font-bold">Encerrada por: </span>
            {journey?.closedBy && players?.get(journey?.closedBy)?.name}
          </p>
        }
      >
        <div className="flex flex-col gap-2">
          <CloseJourney action={closeJourney} journey={journey} />

          <JourneyPodiumDialog>
            <JourneyPodiumForm journey={journey} players={players} />
          </JourneyPodiumDialog>
        </div>
      </ConditionalRender>
    </div>
  );
}
