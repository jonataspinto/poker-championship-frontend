import { Divider } from "@/components/ui";
import { BestHandAndEliminator } from "@/containers/journeys/BestHandAndEliminator";
import { FinalResult } from "@/containers/journeys/FinalResult";
import { JourneyActions } from "@/containers/journeys/JourneyActions";
import { Podium } from "@/containers/journeys/Podium";
import { getJourneyById } from "@/services/actions";

export default async function Page(pageProps: PageProps) {
  const { id } = await pageProps.params;
  const journey = await getJourneyById(id);
  return (
    <>
      <FinalResult journeyId={id} />
      <Podium podium={journey.podium} />
      <Divider />
      <JourneyActions journey={journey} />
      <BestHandAndEliminator journey={journey} />
    </>
  );
}
