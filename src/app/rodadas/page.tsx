import { listJourneys, listPlayers } from "@/services/actions";
import { DetailPanel } from "@/components/DetailPanel";
import { Divider } from "@/components/Divider";
import { Podium } from "./_components/Podium";
import { BestHandAndEliminator } from "./_components/BestHandAndEliminator";
import { JourneyActions } from "./_components/JourneyActions";
import { CreateNewJourney } from "./_components/CreateNewJourney";

export default async function Page() {
  const journeys = await listJourneys();
  const players = await listPlayers();
  const playersMap = new Map(players?.map((player) => [player.id, player]));

  const title = (_journey: JourneyDTO) =>
    `Rodada #${_journey?.tag} - ${new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "long"
    }).format(new Date(_journey?.createdAt))}`;

  return (
    <div className="flex flex-col items-center gap-4 p-4 w-full max-w-2xl mx-auto">
      <CreateNewJourney
        disabled={journeys?.some((journey) => !journey?.hasClosed)}
      />
      {journeys?.map((journey, index) => (
        <DetailPanel.Root
          key={journey.id}
          open={index === 0 && !journey?.hasClosed}
          className="border border-solid border-gray-800 rounded-lg w-full"
        >
          <DetailPanel.Summary>
            <span className="text-lg font-bold px-4">{title(journey)}</span>
          </DetailPanel.Summary>
          <DetailPanel.Content className="flex flex-col gap-4 mt-0 pb-4">
            <Divider className="bg-gray-800" />
            <Podium podium={journey.podium} players={playersMap} />
            <Divider className="bg-gray-800" />
            <BestHandAndEliminator journey={journey} players={playersMap} />
            <Divider className="bg-gray-800" />
            <JourneyActions journey={journey} />
          </DetailPanel.Content>
        </DetailPanel.Root>
      ))}
    </div>
  );
}
