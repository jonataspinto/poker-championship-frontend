import { Divider } from "@/components/ui";
import { BestHandAndEliminator } from "@/pages/journeys/BestHandAndEliminator";
import { FinalResult } from "@/pages/journeys/FinalResult";
import { JourneyActions } from "@/pages/journeys/JourneyActions";
import { Podium } from "@/pages/journeys/Podium";
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
