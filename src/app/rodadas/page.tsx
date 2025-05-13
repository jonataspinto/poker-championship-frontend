import { PlayerService, listJourneys } from "@/services/actions";
import { DetailPanel } from "@/components/DetailPanel";
import { Divider } from "@/components/Divider";
import { Podium } from "./_components/Podium";
import { BestHandAndEliminator } from "./_components/BestHandAndEliminator";
import { JourneyActions } from "./_components/JourneyActions";

export default async function Page() {
  const data = await listJourneys();
  const players = await PlayerService.list();
  const playersMap = new Map(players?.map((player) => [player.id, player]));

  const title = (_journey: JourneyDTO) =>
    `Rodada #${_journey?.tag} - ${new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "long"
    }).format(new Date(_journey?.createdAt))}`;

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      {data?.map((journey, index) => (
        <div key={journey.id} className="w-full max-w-2xl">
          <DetailPanel.Root
            open={index === 0}
            className="border border-solid border-gray-800 rounded-lg"
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
        </div>
      ))}
    </div>
  );
}
