import { Divider } from "@/components/ui";
import { BestHandAndEliminator } from "@/containers/journeys/BestHandAndEliminator";
import { FinalResult } from "@/containers/journeys/FinalResult";
import { JourneyActions } from "@/containers/journeys/JourneyActions";
import { getJourneyById } from "@/services/actions";

export default async function Page(pageProps: PageProps) {
  const { id } = await pageProps.params;
  const journey = await getJourneyById(id);
  return (
    <>
      <FinalResult journeyId={id} />
      <Divider className="my-4" />
      <JourneyActions journey={journey} />
      <BestHandAndEliminator journey={journey} />
    </>
  );
}
