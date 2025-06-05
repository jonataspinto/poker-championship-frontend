import Link from "next/link";
import { ConditionalRender } from "@/components/ConditionalRender";
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
    <div className="px-4">
      <div className="flex flex-col gap-2">
        <ConditionalRender
          condition={!journey.hasClosed}
          fallback={
            <>
              <p className="truncate text-nowrap">
                <span className="font-bold">Encerrada por: </span>
                {journey?.closedBy && players?.get(journey?.closedBy)?.name}
              </p>
              <Link className="btn btn-light" href={`rodadas/${journey.id}`}>
                Ver detalhes
              </Link>
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
